import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MobileSidebar } from "./components/MobileSidebar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Results from "./pages/Results";
import PointsTable from "./pages/PointsTable";
import SargamPrathibha from "./pages/SargamPrathibha";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import styles from './styles/FadeIn.module.css';
import CustomCursor from './components/CustomCursor';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <CustomCursor />
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className={`flex-1 p-4 transition-all duration-300 ${isCollapsed ? "md:ml-20" : "md:ml-64"} ${styles.fadeIn}`}>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden mb-4 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/results" element={<Results />} />
              <Route path="/points-table" element={<PointsTable />} />
              <Route path="/sargam-prathibha" element={<SargamPrathibha />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </Router>
  );
};

export default App;
