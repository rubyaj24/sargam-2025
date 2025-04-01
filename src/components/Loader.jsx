import React from 'react';
import LoaderVideo from '../assets/loader.mp4';
import LoaderMaxVideo from '../assets/loader-max.mp4';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover lg:hidden"
      >
        <source src={LoaderVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <video
        autoPlay
        loop
        muted
        className="hidden lg:block w-full h-full object-cover"
      >
        <source src={LoaderMaxVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}