import React from "react";
import sargam_logo from "../assets/sargam_logo.png";

export function Navbar() {
  return (
    <nav className="border-b bg-gradient-to-r from-red-900 to-orange-600 px-6 py-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={sargam_logo}
          alt="Sargam Logo"
          className="h-12 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
        />
        {/* <h1 className="text-2xl font-bold text-yellow-300 tracking-wide drop-shadow-md">
          Sargam 2025
        </h1> */}
      </div>
      <div className="text-white text-sm italic font-semibold tracking-wider">
        "Echoes of Tradition, Flames of Art"
      </div>
    </nav>
  );
}
