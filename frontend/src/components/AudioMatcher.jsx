import React, { useState, useRef, useEffect } from 'react';

const AudioMatcher = () => {
    const [notes, setNotes] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const websocket = useRef(null);

    const startProcessing = () => {
        setIsProcessing(true);
        setNotes([]);
        setAnalysis(null);
        websocket.current = new WebSocket('ws://localhost:8000/ws/audio/');
        websocket.current.binaryType = 'arraybuffer';

        websocket.current.onmessage = (event) => {
            if (event.data === 'Processing Complete') {
                stopProcessing();
            } else if (typeof event.data === 'string') {
                const data = JSON.parse(event.data);
                if (data.waveform_spectrogram_base64) {
                    setAnalysis(data);
                } else {
                    setNotes((prevNotes) => [...prevNotes, event.data]);
                }
            }
        };

        websocket.current.onclose = () => {
            setIsProcessing(false);
        };
    };

    const stopProcessing = () => {
        if (websocket.current) {
            websocket.current.close();
        }
        setIsProcessing(false);
    };

    useEffect(() => {
        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, []);

    const renderAnalysis = () => {
        if (!analysis) return null;

        const { mean_frequency, standard_deviation, frequency_count, frequencies_in_order, note_counts, mode_note, waveform_spectrogram_base64 } = analysis;

        return (
            <div>
                <h3>Analysis Results</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Mean Frequency:</th>
                            <td>{mean_frequency} Hz</td>
                        </tr>
                        <tr>
                            <th>Standard Deviation:</th>
                            <td>{standard_deviation} Hz</td>
                        </tr>
                        <tr>
                            <th>Frequency Count:</th>
                            <td>{frequency_count}</td>
                        </tr>
                        <tr>
                            <th>Frequencies in Order:</th>
                            <td>{frequencies_in_order.join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h4>Detected Notes and Counts</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Note</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {note_counts.map(([note, count], index) => (
                                <tr key={index}>
                                    <td>{note}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Mode Note:</strong> {mode_note}</p>
                </div>
                <div>
                    <h4>Waveform and Spectrogram</h4>
                    <img src={`data:image/png;base64,${waveform_spectrogram_base64}`} alt="Waveform and Spectrogram" />
                </div>
            </div>
        );
    };

    return (
        <div>
            <button onClick={startProcessing} disabled={isProcessing}>Start Processing</button>
            <button onClick={stopProcessing} disabled={!isProcessing}>Stop Processing</button>
            <div>
                <h3>Detected Notes:</h3>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
                {renderAnalysis()}
            </div>
        </div>
    );
};

export default AudioMatcher;
