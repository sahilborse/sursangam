import React, { useState, useRef, useEffect } from 'react';

const AudioProcessor = () => {
    const [notes, setNotes] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const websocket = useRef(null);

    const toggleProcessing = () => {
        if (isProcessing) {
            stopProcessing();
        } else {
            startProcessing();
        }
    };

    const startProcessing = () => {
        setIsProcessing(true);
        setNotes([]);
        setAnalysis(null);
        websocket.current = new WebSocket('ws://localhost:8000/');
        // websocket.current = new WebSocket('https://adda-210-212-183-60.ngrok-free.app');
        websocket.current.binaryType = 'arraybuffer';


        websocket.current.onmessage = (event) => {
            if (event.data === 'Processing Complete') {
                setIsProcessing(!isProcessing);
                stopProcessing();
            } else if (typeof event.data === 'string') {
                const data = JSON.parse(event.data);
                if (data.waveform_spectrogram_base64) {
                    setIsProcessing(!isProcessing); 
                    setAnalysis(data);
                } else {
                    setIsProcessing(!isProcessing);
                    setNotes((prevNotes) => [...prevNotes, event.data]);
                }
            }
        };

        websocket.current.onclose = () => {
            setIsProcessing(!isProcessing);
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
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-200 to-yellow-100 border-4 border-[#D4AF37] rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-[#B22222] border-b-2 border-[#D4AF37] pb-2">🎵 Analysis Results</h3>
                <table className="w-full mt-4 border-collapse border border-[#D4AF37]">
                    <tbody>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left text-[#8B0000]">Mean Frequency:</th>
                            <td className="px-4 py-2">{mean_frequency} Hz</td>
                        </tr>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left text-[#8B0000]">Standard Deviation:</th>
                            <td className="px-4 py-2">{standard_deviation} Hz</td>
                        </tr>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left text-[#8B0000]">Frequency Count:</th>
                            <td className="px-4 py-2">{frequency_count}</td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 text-left text-[#8B0000]">Frequencies in Order:</th>
                            <td className="px-4 py-2">{frequencies_in_order.join(', ')}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-[#B22222]">🎶 Detected Notes & Counts</h4>
                    <table className="w-full mt-2 border-collapse border border-[#D4AF37] bg-white">
                        <thead>
                            <tr className="bg-[#D4AF37] text-white">
                                <th className="px-4 py-2">Note</th>
                                <th className="px-4 py-2">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {note_counts.map(([note, count], index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{note}</td>
                                    <td className="px-4 py-2">{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-lg font-medium text-[#B22222]">
                        🏆 Mode Note: <span className="font-bold">{mode_note}</span>
                    </p>
                </div>

                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-[#B22222]">🌊 Waveform & Spectrogram</h4>
                    <img className="mt-2 rounded-lg shadow-md border-4 border-[#D4AF37]" src={`data:image/png;base64,${waveform_spectrogram_base64}`} alt="Waveform and Spectrogram" />
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-[#FFF5E1] border-4 border-[#D4AF37] rounded-lg shadow-2xl">
            <div className="text-center text-2xl font-bold text-[#8B0000] mb-6">
                🎶 Indian Classical Audio Processor 🎶
            </div>
            <div className="flex justify-center space-x-6">
            <button onClick={toggleProcessing} 
                    className={`px-6 py-3 font-semibold rounded-full shadow-md hover:scale-105 transition-all ${isProcessing ? 'bg-gradient-to-r from-gray-700 to-black text-white' : 'bg-gradient-to-r from-red-600 to-orange-500 text-white'}`}> 
                    {isProcessing ? '❌ Stop Processing' : '🚀 Start Processing'}
                </button>
                {/* <button onClick={startProcessing} 
                disabled={isProcessing} 
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all">
                    🚀 Start Processing
                </button>
                <button onClick={stopProcessing} 
                disabled={!isProcessing} 
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-black text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all">
                    ❌ Stop Processing
                </button>  */}
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-semibold text-[#8B0000] border-b pb-2">🎼 Detected Notes:</h3>
                <ul className="list-disc list-inside mt-4 text-[#444]">
                    {notes.map((note, index) => (
                        <li key={index} className="py-1 text-lg">{note}</li>
                    ))}
                </ul>
                {renderAnalysis()}
            </div>
        </div>
    );
};

export default AudioProcessor;
