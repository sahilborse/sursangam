import numpy as np
import matplotlib.pyplot as plt
import librosa
import librosa.display
from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
import json
import statistics
from collections import Counter
import pyaudio
import re
import base64
from io import BytesIO

app = FastAPI()

# Constants
CHUNK = 1024  # Number of samples per buffer
FORMAT = pyaudio.paInt16  # 16-bit resolution
CHANNELS = 1  # Mono audio
RATE = 22050  # 22.05kHz sampling rate
RECORD_SECONDS = 5  # Duration of recording

# Note frequencies (in Hz) for the 4th octave (C4 - B4)
NOTE_FREQUENCIES = {
    'C4-> dha(Komal)': 261.63, 'C#4-> Dha(Shudh)': 277.18, 'D4-> ni(Komal)': 293.66, 'D#4 -> Ni': 311.13, 'E4-> Sa': 329.63,
    'F4-> re(Komal)': 349.23, 'F#4-> Re(Shudha)': 369.99, 'G4-> ga(Komal)': 392.00, 'G#4-> Ga(Shudh)': 415.30, 'A4-> ma(shudh)': 440.00,
    'A#4-> Ma (Tivra)': 466.16, 'B4-> Pa': 493.88
}

def freq_to_note_in_range(freq, range_hz=10):
    """Convert a frequency to the nearest musical note within a specified range."""
    for note, note_freq in NOTE_FREQUENCIES.items():
        if abs(note_freq - freq) <= range_hz:
            return note
    return None

def extract_note_name(note):
    """Extract note name from the note string."""
    match = re.search(r'->\s*([^(\s]*)', note)
    return match.group(1) if match else note

def process_audio_chunk(audio_chunk, rate):
    """Process audio chunk and return analysis results."""
    fft_data = np.fft.fft(audio_chunk)
    freqs = np.fft.fftfreq(len(fft_data))
    idx = np.argmax(np.abs(fft_data))
    freq = freqs[idx]
    freq_in_hz = abs(freq * rate)
    note = freq_to_note_in_range(freq_in_hz)
    return note, freq_in_hz

def filter_notes(notes, min_repeats=5):
    """Filter notes array by counting notes that appear at least min_repeats times consecutively."""
    filtered_notes = []
    current_note = None
    count = 0

    for note in notes:
        if note == current_note:
            count += 1
        else:
            if count >= min_repeats:
                filtered_notes.append(current_note)
            current_note = note
            count = 1

    if count >= min_repeats:
        filtered_notes.append(current_note)

    return filtered_notes

# @app.websocket("/ws/audio/")
@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    notes = []
    frequencies = []
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS,
                    rate=RATE, input=True,
                    frames_per_buffer=CHUNK)
    print("Recording...")

    try:
        # Record the audio
        frames = []
        for _ in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(np.frombuffer(data, dtype=np.int16))
        
        # Stop and close the stream
        stream.stop_stream()
        stream.close()
        p.terminate()

        audio_data = np.hstack(frames)

        # Process the recorded audio
        for audio_chunk in frames:
            note, freq = process_audio_chunk(audio_chunk, rate=RATE)
            if note:
                notes.append(note)
                frequencies.append(freq)
                await websocket.send_text(note)

        if frequencies:
            mean_freq = round(statistics.mean(frequencies), 2)
            stddev_freq = round(statistics.stdev(frequencies), 2)
            freq_count = len(frequencies)
            filtered_note_names = filter_notes([extract_note_name(note) for note in notes])
            note_counts = Counter(notes).most_common()
            mode_note = statistics.mode(notes) if notes else None

            # Create waveform and spectrogram plots
            plt.figure(figsize=(12, 9))

            plt.subplot(2, 1, 1)
            plt.plot(audio_data)
            plt.title("Waveform")
            plt.xlabel("Sample")
            plt.ylabel("Amplitude")

            plt.subplot(2, 1, 2)
            plt.specgram(audio_data, Fs=RATE, NFFT=1024, noverlap=512, cmap='inferno')
            plt.ylim(0, 550)
            plt.title("Spectrogram")
            plt.xlabel("Time (s)")
            plt.ylabel("Frequency (Hz)")

            plt.tight_layout()

            # Save plots to a bytes object
            buffer = BytesIO()
            plt.savefig(buffer, format='png')
            buffer.seek(0)

            # Encode plots to base64
            waveform_spectrogram_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            print("fr")
            print(filtered_note_names)
            analysis_result = {
                "mean_frequency": mean_freq,
                "standard_deviation": stddev_freq,
                "frequency_count": freq_count,
                "frequencies_in_order": filtered_note_names,
                "note_counts": note_counts,
                "mode_note": mode_note,
                "waveform_spectrogram_base64": waveform_spectrogram_base64
            }
            await websocket.send_json(analysis_result)

        # Notify the client that processing is complete
        await websocket.send_text("Processing Complete")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await websocket.close()

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
