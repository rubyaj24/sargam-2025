import React from "react";
import banner_1 from "../assets/banner_1.png";

const Banner = () => {
  return (
    <div className="p-0.5 bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400 rounded-xl ">
      <div
        className="relative aspect-[2.35/1] flex items-center rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${banner_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 bg-opacity-50"></div>

        <div className="absolute bottom-0 z-10 p-6 md:p-10 text-white">
          <p className="text-lg md:text-xl italic opacity-90 font-semibold text-yellow-400">
            Oru CET Kalolsavam
          </p>
          <p className="mt-2 text-sm md:text-base max-w-md opacity-80">
            Brace yourself for an unforgettable experience filled with music, dance, and creativity. Join us in celebrating the spirit of art and culture at Sargam 2025!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
