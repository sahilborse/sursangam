import React from "react";
import sitar1 from "../../assets/sitar1.jpg";
import sitar2 from "../../assets/sitar2.jpg";

const SitarComponent = () => {
  return (
    <div className="bg-[#FFF8E1] min-h-screen p-8 flex flex-col items-center font-serif w-full">
      {/* Heading with GIF */}
      <div className="border-4 border-[#D4AF37] p-6 rounded-xl mb-8 flex flex-row items-center shadow-lg bg-[#FAE3B0] w-full max-w-5xl justify-center">
        <h1 className="text-4xl font-bold text-[#8B4513] mr-4">
          Sitar - The Soul of Indian Classical Music
        </h1>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanIxOXhia2xsajB2a245eDFkOHdocHc4ZHlyNnU4bjV6ZHByamNiMyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/gw30q2nbywEP61FwNH/giphy.gif"
          alt="Sitar GIF"
          className="w-24 h-24"
        />
      </div>
      
      {/* Sitar Information */}
      <div className="text-[#5D4037] max-w-7xl w-full text-lg px-4">
        <h2 className="text-3xl font-bold mb-4 border-b-2 border-[#D4AF37] pb-2">Parts of the Sitar</h2>
        <div className="flex flex-wrap justify-center gap-6 my-6">
          <img
            src={sitar1}
            alt="Sitar Parts"
            className="w-96  object-cover border-4 border-[#D4AF37] shadow-md"
          />
          <img
            src={sitar2}
            alt="Sitar Parts"
            className="w-96 object-cover border-4 border-[#D4AF37] shadow-md"
          />
        </div>

        <ul className="list-disc pl-8">
          <li><strong>Tumba (Resonator):</strong> Amplifies the sound, made from a gourd.</li>
          <li><strong>Dand (Neck):</strong> Long wooden neck with frets and strings.</li>
          <li><strong>Frets (Pardas):</strong> Movable metal frets for note variation.</li>
          <li><strong>Main Strings (Baj Tar):</strong> Played for melody.</li>
          <li><strong>Drone & Rhythm Strings (Chikari):</strong> Used for rhythm.</li>
          <li><strong>Sympathetic Strings (Tarab):</strong> Vibrate to add resonance.</li>
        </ul>
        
        <h2 className="text-3xl font-bold mt-6 mb-4 border-b-2 border-[#D4AF37] pb-2">Sargam Notes (Indian Scale)</h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse border border-[#D4AF37] shadow-lg text-center">
            <thead className="bg-[#FAE3B0]">
              <tr>
                <th className="border border-[#D4AF37] px-6 py-3 text-[#8B4513]">Sargam</th>
                <th className="border border-[#D4AF37] px-6 py-3 text-[#8B4513]">Western Notes</th>
                <th className="border border-[#D4AF37] px-6 py-3 text-[#8B4513]">Fret Position</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[
                ["Sa", "C", "Open string"],
                ["Re", "D", "4th fret"],
                ["re (Komal)", "C#", "3rd fret"],
                ["Ga", "E", "6th fret"],
                ["ga (Komal)", "D#", "5th fret"],
                ["Ma", "F", "9th fret"],
                ["Ma (Tivra)", "F#", "10th fret"],
                ["Pa", "G", "12th fret"],
                ["Dha", "A", "16th fret"],
                ["dha (Komal)", "G#", "15th fret"],
                ["Ni", "B", "18th fret"],
                ["ni (Komal)", "A#", "17th fret"],
              ].map(([sargam, western, fret], index) => (
                <tr key={index} className="hover:bg-[#FAE3B0]">
                  <td className="border border-[#D4AF37] px-6 py-3">{sargam}</td>
                  <td className="border border-[#D4AF37] px-6 py-3">{western}</td>
                  <td className="border border-[#D4AF37] px-6 py-3">{fret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SitarComponent;
