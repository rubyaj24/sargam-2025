import {
  Calendar,
  Users,
  Table2Icon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import sargam_logo from "../assets/sargam_logo.png";

export function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const menuItems = [
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Users, label: "Results", path: "/results" },
    { icon: Table2Icon, label: "Points Table", path: "/points-table" },
    { icon: Table2Icon, label: "Sargam Prathibha", path: "/sargam-prathibha" },
  ];

  return (
    <div
      className={`hidden md:block h-screen border-r border-gray-700 bg-black text-white p-4 transition-all duration-300 fixed ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        className="absolute -right-4 top-4 h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-md flex items-center justify-center"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Link to="/" className="block w-full">
          <img
            src={sargam_logo}
            alt="Sargam Logo"
            className="w-full h-auto drop-shadow-[0_4px_6px_rgba(255,255,255,0.4)] transition-all duration-300"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 hover:bg-yellow-500 hover:text-black"
            }`}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
