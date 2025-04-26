import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-yellow-50 min-h-screen p-6 font-serif flex flex-col items-center w-full">
      <motion.div 
        className="w-full text-center p-6 bg-gradient-to-r from-yellow-200 to-yellow-500 shadow-md flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanIxOXhia2xsajB2a245eDFkOHdocHc4ZHlyNnU4bjV6ZHByamNiMyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/gw30q2nbywEP61FwNH/giphy.gif"
          alt="Sitar"
          className="w-16 h-16 object-contain"
        />
        <Typography variant="h3" className="text-brown-800 font-bold">
          About Our Platform
        </Typography>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZ6ZTVuNnVoOGNoNmE3a294ZmRjYjMxZjcwbm1sNTJsc2pzN3k3dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/FunPduKPzk2mVQ8Q3M/giphy.gif"
          alt="Bansuri Sticker"
          className="w-16 h-16 object-contain"
        />
      </motion.div>

      <motion.div 
        className="w-full max-w-4xl mt-8 p-6 bg-white shadow-xl border border-yellow-700 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" className="text-brown-900 font-semibold">
          Discover & Learn Unique Indian Musical Instruments
        </Typography>
        <Typography className="text-gray-800 mt-4">
          Our platform is dedicated to teaching Indian musical instruments that are rare and not easily found elsewhere. We provide a structured and engaging learning experience, making it easy for anyone to pick up and play these beautiful instruments by themselves.
        </Typography>
      </motion.div>

      <div className="w-full flex flex-wrap justify-center gap-6 mt-12">
        <Card className="max-w-sm bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZ6ZTVuNnVoOGNoNmE3a294ZmRjYjMxZjcwbm1sNTJsc2pzN3k3dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/FunPduKPzk2mVQ8Q3M/giphy.gif" alt="Bansuri" className="w-12 h-12 mb-2" />
          <CardContent>
            <Typography variant="h6" className="text-brown-800 font-bold">
              Easy-to-Learn Lessons
            </Typography>
            <Typography className="text-gray-700 mt-2">
              Step-by-step guidance to help you master each instrument at your own pace.
            </Typography>
          </CardContent>
        </Card>
        
        <Card className="max-w-sm bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanIxOXhia2xsajB2a245eDFkOHdocHc4ZHlyNnU4bjV6ZHByamNiMyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/gw30q2nbywEP61FwNH/giphy.gif" alt="Sitar" className="w-12 h-12 mb-2" />
          <CardContent>
            <Typography variant="h6" className="text-brown-800 font-bold">
              Self-Paced Learning
            </Typography>
            <Typography className="text-gray-700 mt-2">
              Learn anytime, anywhere with interactive tutorials and practice sessions.
            </Typography>
          </CardContent>
        </Card>
        
        <Card className="max-w-sm bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZ0cXV2djlseDBrMDk4b3l3emZ2d2MycXgyZzIyZzRpNDlsNDdqcCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/3qsey3v7fVt1MLV7Qq/giphy.gif" alt="Tabla" className="w-12 h-12 mb-2" />
          <CardContent>
            <Typography variant="h6" className="text-brown-800 font-bold">
              Connect & Grow
            </Typography>
            <Typography className="text-gray-700 mt-2">
              Join a community of learners and get feedback from experienced musicians.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
