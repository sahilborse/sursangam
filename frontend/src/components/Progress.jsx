import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axios";
const Progress = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("flute");
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId=localStorage.getItem('user');
  useEffect(() => {

    // Fetch progress data from the server
    axiosInstance
      .get(`http://localhost:5000/practice/progress/${userId}`)
      .then((response) => {
        console.log(response.data);
        setProgressData(response.data.data);
        console.log("Progress Data:", response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching progress data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-xl font-semibold text-orange-700">Loading progress...</p>;
  }

  if (!progressData) {
    return <p className="text-center text-xl font-semibold text-red-700">Failed to load progress.</p>;
  }

  const instrumentData = {
    flute: { name: "Flute", emoji: "🎶", progress: progressData.flute * 10 },
    tabla: { name: "Tabla", emoji: "🥁", progress: progressData.tabla * 10 },
    sitar: { name: "Sitar", emoji: "🎸", progress: progressData.sitar * 10 },
  };

  const { name, emoji, progress } = instrumentData[selectedInstrument];

  const progressSteps = Array.from({ length: 10 }, (_, index) => (index + 1) * 10);

  return (
    <div className="p-6 text-center max-w-4xl mx-auto bg-gradient-to-b from-orange-100 to-yellow-50 rounded-xl shadow-lg">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-orange-800">{name} Journey {emoji}</h1>

      {/* Instrument Selection Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(instrumentData).map((instrument) => (
          <button
            key={instrument}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedInstrument === instrument
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedInstrument(instrument)}
          >
            {instrumentData[instrument].name}
          </button>
        ))}
      </div>

      {/* Roadmap Progress (Horizontal) */}
      <div className="flex items-center justify-between w-full relative px-4">
        {progressSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center w-full">
            {/* Connecting Line */}
            {index > 0 && (
              <div
                className={`h-1 w-10 sm:w-16 md:w-20 ${
                  step <= progress ? "bg-orange-600" : "bg-gray-300"
                }`}
              />
            )}
            {/* Instrument Emoji Node */}
            <div
              className={`w-12 h-12 flex items-center justify-center text-3xl font-bold rounded-full border-4 ${
                step <= progress
                  ? "border-orange-600 bg-orange-200 shadow-md"
                  : "border-gray-400 bg-gray-200"
              } ${step === progress ? "animate-bounce scale-110 bg-yellow-300 shadow-xl" : ""}`}
            >
              {step === progress ? "✨" : emoji}
            </div>
            <span className="mt-2 text-lg font-semibold text-orange-900">
              {step}% {step === progress ? " - You're here!" : ""}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-lg h-6 overflow-hidden mt-6">
        <div
          className="bg-orange-600 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-lg font-medium text-orange-900">
        You have completed {progress}% of the {name} course.
      </p>
    </div>
  );
};

export default Progress;
