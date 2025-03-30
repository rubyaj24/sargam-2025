import Banner from "@/components/Banner";
import React from "react";
import { NavLink } from "react-router-dom";
import backgroundVideo from "../assets/banner.mp4";

export default function Home() {
  const buttonItems = [
    {
      name: "Events",
      link: "/events",
      caption: "Experience the grand festivities!",
    },
    {
      name: "Points Table",
      link: "/points-table",
      caption: "Track the latest competition rankings!",
    },
    {
      name: "Results",
      link: "/results",
      caption: "Celebrate the champions and highlights!",
    },
    {
      name: "Sargam Prathibha",
      link: "/sargam-prathibha",
      caption: "Discover the stars of Sargam 2025!",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support video playback.
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-8 px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center p-5">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-700 drop-shadow-lg leading-tight">
            Welcome to <span className="text-yellow-400">Sargam 2025</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            A vibrant celebration of talent, culture, and unity!
          </p>
        </div>
        <Banner />
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {buttonItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `relative block min-h-56 bg-gradient-to-r from-red-700 to-red-500 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  isActive ? "ring-2 ring-yellow-400" : ""
                }`
              }
            >
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-opacity-30 bg-black hover:bg-opacity-20 transition-all duration-300"></div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col h-full justify-between p-6">
                <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">
                  {item.name}
                </h2>
                <p className="bg-yellow-400 text-gray-900 font-semibold text-base md:text-lg p-4 rounded-b-lg text-center">
                  {item.caption}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
