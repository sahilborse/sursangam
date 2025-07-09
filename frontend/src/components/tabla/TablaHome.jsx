import React from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";
import tablaImage from "../../assets/tabla.jpg";
import naImage from "../../assets/na.png";
import tinImage from "../../assets/tin.png";
import geImage from "../../assets/ge.png";
import dhaImage from "../../assets/dha.png";
import keImage from "../../assets/ke.png";
import dheImage from "../../assets/Thun.png";
import takImage from "../../assets/tak.png";

export default function TablaLearning() {
  return (
    <div className="bg-yellow-50 min-h-screen p-6 font-serif flex flex-col items-center w-full">
      <motion.div 
        className="w-full text-center p-6 bg-gradient-to-r from-yellow-200 to-yellow-500 shadow-md flex items-center justify-center gap-4 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" className="text-brown-800 font-bold">
          Learn to Play Tabla
        </Typography>
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZ0cXV2djlseDBrMDk4b3l3emZ2d2MycXgyZzIyZzRpNDlsNDdqcCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/3qsey3v7fVt1MLV7Qq/giphy.gif" alt="Tabla GIF" className="w-12 h-12 ml-4" />
       
      </motion.div>

      <motion.div 
        className="w-full max-w-4xl mt-8 p-6 bg-white shadow-xl border border-yellow-700 rounded-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      
        <img src={tablaImage} alt="Tabla" className="w-full h-60 object-contain my-4" />
        <Typography className="text-gray-800">
          The Tabla is a traditional Indian percussion instrument, consisting of a pair of drums: the **Dahina** (treble drum) and **Bayan** (bass drum). It is used in Indian classical music, folk, and fusion genres. Learning Tabla involves mastering **strokes, phonetics (bols), rhythms, and time cycles (tals).**
        </Typography>
        <Typography className="text-gray-800 mt-4">
          Tabla playing is based on specific rhythmic patterns called **Tals**. Each Tal consists of a set of beats grouped into cycles. Some common Tals include:
          <ul className="list-disc pl-6">
            <li><b>Teental (16 beats)</b> - The most common rhythm cycle.</li>
            <li><b>Keherva (8 beats)</b> - Popular in folk and semi-classical music.</li>
            <li><b>Rupak (7 beats)</b> - Used in semi-classical compositions.</li>
            <li><b>Jhaptal (10 beats)</b> - Frequently used in classical compositions.</li>
            <li><b>Dadra (6 beats)</b> - A simple and widely used rhythm.</li>
          </ul>
        </Typography>
        <Typography className="text-gray-800 mt-4">
          Tabla playing also involves **improvisation**, where musicians develop variations on Thekas (basic rhythmic patterns) and engage in rhythmic conversations through compositions like **Peshkar, Kayda, Rela, and Tukra**.
        </Typography>
      </motion.div>

      {/* Basic Strokes and Phonetics (Bols) with Compact Images */}
      <motion.div className="w-full max-w-4xl mt-8 p-6 bg-white shadow-xl border border-yellow-700 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Typography variant="h5" className="text-brown-900 font-semibold text-center">
          Basic Strokes & Phonetics (Bols)
        </Typography>
        <Grid container spacing={2} className="mt-4">
          {[{ name: "Na / Ta", img: naImage }, { name: "Te / Tin", img: tinImage }, { name: "Ge / Ghe", img: geImage }, { name: "Dha / Dhin", img: dhaImage }, { name: "Ke", img: keImage }, { name: "Dhe = Ge + Na", img: dheImage }, { name: "Tak", img: takImage }].map((bol, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card className="shadow-md border border-yellow-500 rounded-lg p-2 text-center">
                <img src={bol.img} alt={bol.name} className="w-full h-24 object-contain rounded-md" />
                <CardContent>
                  <Typography variant="subtitle1" className="text-brown-900 font-semibold">
                    {bol.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
      <motion.div className="w-full max-w-4xl mt-8 p-6 bg-white shadow-xl border border-yellow-700 rounded-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Typography variant="h5" className="text-brown-900 font-semibold">
          तीन ताल (Teentaal)
        </Typography>
        <Typography className="text-gray-800 mt-2">
          तीन ताल भारतीय शास्त्रीय संगीत में सबसे अधिक प्रयोग की जाने वाली ताल है। इसमें कुल **16 मात्राएँ** होती हैं, जिन्हें 4 भागों में विभाजित किया जाता है। इसका ठेका इस प्रकार होता है:
        </Typography>
        <Typography className="text-gray-800 font-bold mt-4">
          धा धिन धिन धा | धा धिन धिन धा | धा तिन तिन ता | ता धिन धिन धा
        </Typography>
        <Typography className="text-gray-800 font-bold mt-4">
          धा धिन धिन धा धा धिन धिन धा धा तिन तिन ता ता धिन धिन धा
        </Typography>
        <Typography className="text-gray-800 mt-4">
          यह ताल बहुत ही संतुलित होती है और इसे कई शास्त्रीय रचनाओं, कत्थक नृत्य और गायन में उपयोग किया जाता है।
        </Typography>
      </motion.div>


      {/* Tri Taak in Hindi */}
      <motion.div className="w-full max-w-4xl mt-8 p-6 bg-white shadow-xl border border-yellow-700 rounded-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Typography variant="h5" className="text-brown-900 font-semibold">
          त्री ता
        </Typography>
        <Typography className="text-gray-800 mt-2">
          त्री ता एक महत्वपूर्ण ताल संरचना है जिसका उपयोग विभिन्न तालचक्रों और जटिल लय संरचनाओं में किया जाता है। यह एक गतिशील पैटर्न है जो संगीत में विविधता और गहराई जोड़ता है।
        </Typography>
      </motion.div>
    </div>
  );
}
