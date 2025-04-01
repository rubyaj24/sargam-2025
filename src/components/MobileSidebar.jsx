import React from 'react';
import { NavLink } from 'react-router-dom';
import sargam_logo from '../assets/sargam_logo.png';
import { Link } from 'react-router-dom';

export const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <button onClick={onClose} className="mb-4">
            <span className="text-2xl">×</span>
          </button>
          <div className="flex justify-center mb-6">
            <Link to="/" className="block w-full">
              <img
                src={sargam_logo}
                alt="Sargam Logo"
                className="w-full h-auto drop-shadow-[0_4px_6px_rgba(255,255,255,0.2)] transition-all duration-300"
              />
            </Link>
          </div>
          <nav>
            <NavLink to="/" className="block py-2" onClick={onClose}>Home</NavLink>
            <NavLink to="/events" className="block py-2" onClick={onClose}>Events</NavLink>
            <NavLink to="/results" className="block py-2" onClick={onClose}>Results</NavLink>
            <NavLink to="/points-table" className="block py-2" onClick={onClose}>Points Table</NavLink>
            <NavLink to="/sargam-prathibha" className="block py-2" onClick={onClose}>Sargam Prathibha</NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};
