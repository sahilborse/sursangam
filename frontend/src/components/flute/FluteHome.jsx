import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import bansuriImage from "../../assets/bansuri.jpg";
import holdingImage from "../../assets/holding_flute.jpg";
import notesImage from "../../assets/holding_flute.jpg";
// import fluteGif from "../../assets/flute_gif.gif";


const steps = [
  {
    title: "Understanding the Bansuri",
    description:
      "The Bansuri is a bamboo flute used in Indian classical music. It has six or seven holes and is played using breath control and finger placement.",
    image: bansuriImage,
  },
  {
    title: "Holding the Flute Correctly",
    description:
      "Your left-hand fingers cover the first three holes, and the right-hand fingers cover the next three. Your thumbs support the flute from below.",
    image: holdingImage,
  },
  {
    title: "Learning Your First Notes (Sa, Re, Ga...)",
    description:
      "Indian classical music identifies 12 major notes out of 22 as Swar. These are: Sa (Shadja), Re (Rushabha), Ga (Gandhara), Ma (Madhyama), Pa (Panchama), Dha (Daivata), Ni (Nishadha). Together, they form Sa Re Ga Ma Pa Dha Ni.",
    image: notesImage,
  },
  {
    title: "Types of Swars",
    description:
      "There are two types of Swar: Achal (static) and Chal (dynamic). Sa and Pa are fixed and called Achal Swar. Re, Ga, Ma, Dha, and Ni are Chal Swar, which can be Shudh (pure), Komal (soft), or Teevr (intense). This results in 12 Swars: Sa Re Re Ga Ga Ma Ma Pa Dha Dha Ni Ni.",
    image: notesImage,
  }
];

const FluteLearning = () => {
  return (
    <div className="bg-yellow-100 min-h-screen p-6 my-0 font-serif flex flex-col items-center w-full">
      <div className="w-full text-center p-6 bg-gradient-to-r from-yellow-200 to-yellow-500 shadow-md flex items-center justify-center gap-4">
        <Typography variant="h3" className="text-brown-800 font-bold">
          Learn Indian Flute - Bansuri
        </Typography>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZ6ZTVuNnVoOGNoNmE3a294ZmRjYjMxZjcwbm1sNTJsc2pzN3k3dCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/FunPduKPzk2mVQ8Q3M/giphy.gif"
          alt="Flute Sticker"
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="w-full px-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="my-8 flex flex-col md:flex-row items-center bg-white shadow-xl border border-yellow-700 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
            />
            <CardContent className="md:w-1/2 p-6">
              <Typography variant="h5" className="text-brown-900 font-semibold">
                {step.title}
              </Typography>
              <Typography className="text-gray-800 mt-2">
                {step.description}
              </Typography>
            </CardContent>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
  <a
    href="/practice/flute"
    className="relative inline-block px-6 py-3 font-bold text-black bg-yellow-400 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:bg-yellow-500 active:scale-95"
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-50 blur-md"></span>
    <span className="relative z-10">🚀 Practice</span>
  </a>
</div>

      
      <div className="w-full bg-gradient-to-r from-yellow-500 to-yellow-300 p-8 mt-12 text-center">
        <Typography variant="h4" className="text-brown-800 font-bold">
          Video Tutorials
        </Typography>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <iframe
            width="560"
            height="315"
            // src="https://youtu.be/u6zktZLausM?si=ldoHLrzYN0BD6pGw"
            src="https://www.youtube.com/embed/example3"
            title="Flute Lesson 1"
            className="rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            // src="https://youtu.be/5rV4Wg9y9VE?si=hoRF4Gpq_SSCLcpY"
            src="https://www.youtube.com/embed/example3"
            title="Flute Lesson 2"
            className="rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/example3"
            title="Flute Lesson 3"
            className="rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        </div>
      </div>

    
    </div>
  );
};

export default FluteLearning;
