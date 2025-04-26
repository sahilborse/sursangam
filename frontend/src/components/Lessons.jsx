import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axios";
import { useParams } from "react-router-dom";

const instrumentGifs = {
  flute: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZ6ZTVuNnVoOGNoNmE3a294ZmRjYjMxZjcwbm1sNTJsc2pzN3k3dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/FunPduKPzk2mVQ8Q3M/giphy.gif",
  tabla: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZ0cXV2djlseDBrMDk4b3l3emZ2d2MycXgyZzIyZzRpNDlsNDdqcCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/3qsey3v7fVt1MLV7Qq/giphy.gif",
  sitar: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanIxOXhia2xsajB2a245eDFkOHdocHc4ZHlyNnU4bjV6ZHByamNiMyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/gw30q2nbywEP61FwNH/giphy.gif",
};

const Lessons = () => {
  const { instrument } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHindi, setShowHindi] = useState(false);
  const userId = localStorage.getItem("user");

  const getInstrumentGif = (instrumenter) => {
    return instrumentGifs[instrumenter.toLowerCase()] || "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"; // Default GIF
  };
  const [gifs, setGifs] = useState(getInstrumentGif(instrument));


  const nextLesson = ()=>{
    try{
      const response = axiosInstance.post(`/practice/lesson`, {userId, instrument});
      if(response){
        window.location.reload();
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get(`/practice/instruments/${userId}`, {
          params: { instrument },
        });
        setLessons(response.data);
      } catch (err) {
        setError("Failed to fetch lessons. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [userId, instrument]);

  return (
    <div className="w-screen h-screen bg-yellow-100 text-black flex flex-col items-center p-8 relative">
      <h1 className="text-6xl font-extrabold text-center mb-8 text-orange-600 animate-pulse">🎵 Lessons 🎼</h1>

      {/* Toggle Button in Top Right */}
      {/* <div className="absolute top-6 right-6">
        <button
          onClick={() => setShowHindi(!showHindi)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
        >
          {showHindi ? "Show English Titles" : "Show Hindi Titles"}
        </button>
      </div> */}

      {loading && <p className="text-center text-gray-600 text-2xl">Loading lessons...</p>}
      {error && <p className="text-center text-red-500 text-2xl">{error}</p>}

      <div className="flex w-full max-w-7xl items-center gap-8">
        {/* GIF Display Area */}
        <img src={gifs} className="w-96 h-96 rounded-xl shadow-lg border border-gray-300" alt="Instrument GIF" />
        
        {/* Lessons List */}
        <div className="w-full max-w-4xl grid grid-cols-1 gap-8 justify-center">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white shadow-lg rounded-xl p-8 transform hover:scale-105 transition-all duration-300 border border-gray-300"
            >
              <h2 className="text-5xl font-bold text-orange-500 mb-4">{showHindi ? lesson.titleHindi : lesson.title}</h2>
              <p className="text-xl text-gray-700 leading-relaxed">{showHindi ? lesson.hindicontent : lesson.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Lesson Button */}
      <div className="mt-10">
        <button
          onClick={() => nextLesson()}
          className="bg-green-500 hover:bg-green-600 text-white text-xl font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
          
        >
          Next Lesson ➡️
        </button>
      </div>
    </div>
  );
};

export default Lessons;
