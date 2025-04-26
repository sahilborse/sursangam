import React from "react";
import backGround from "../assets/background.jpg";
import {useNavigate} from "react-router-dom";


function SurSagamLanding() {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center font-serif  ">
      {/* Blurred and Darkened Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backGround})`,
          filter: "blur(4px) brightness(60%)",
        }}
      ></div>

      {/* Semi-Transparent Content Box for Better Visibility */}
      <div className="relative z-10 bg-orange bg-opacity-20 backdrop-blur-lg text-white rounded-lg p-8 shadow-lg max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to SurSagam
        </h1>
        <p className="text-xl  mb-6 leading-relaxed text-white">
          Dive into the timeless melodies of Indian classical music with SurSagam.
          Whether you are a beginner or a seasoned musician, our platform provides
          immersive learning experiences with in-depth lessons, expert guidance,
          and a community of passionate learners.
        </p>
        <p className="text-lg  mb-4 leading-relaxed text-white">
          Explore a wide range of traditional instruments, refine your skills with
          structured practice sessions, and engage in interactive discussions with
          mentors and fellow musicians. Our courses are designed to make learning
          engaging, accessible, and truly enriching.
        </p>
        <p className="text-lg  mb-6 leading-relaxed text-white">
          Join us in preserving the rich cultural heritage of Indian music. Let the
          rhythms of tradition guide you in your musical journey.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 text-lg rounded-lg font-bold transition-transform transform hover:scale-105 text-white"
        onClick={() => navigate('/login')}>
          Start Learning
        </button>
      </div>
    </div>
  );
}

export default SurSagamLanding;
