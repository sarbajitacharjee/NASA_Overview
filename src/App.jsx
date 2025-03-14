import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import Apod from "./components/Apod";
import MarsRover from "./components/MarsRover";
import ISSLiveTracker from "./components/ISSLiveTracker";
import EarthImages from "./components/EarthImages";
import MarsRoverPhotos from "./components/MarsRoverPhotos";
import Neos from "./components/Neos";
import NasaLibrary from "./components/NasaLibrary";
import SpaceWeather from "./components/SpaceWeather";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-5">
        {/* Navigation Bar */}
        <nav className="relative flex justify-between items-center md:justify-center mb-6">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Nav Links */}
          <ul
            className={`fixed md:static left-0 top-16 w-full md:w-auto bg-gray-800 md:bg-transparent border border-white md:border-none p-5 md:p-0 md:flex md:space-x-6 text-lg rounded-lg shadow-lg transition-all duration-300 z-50 ${
              isMenuOpen ? "block" : "hidden md:flex"
            }`}
          >
            {[
              { path: "/", name: "APOD", hover: "hover:text-yellow-400" },
              { path: "/MarsRoverPhotos", name: "Mars Rover Photos", hover: "hover:text-green-400" },
              { path: "/ISSLiveTracker", name: "ISS Live Tracker", hover: "hover:text-blue-400" },
              { path: "/mars", name: "Mars Rover", hover: "hover:text-red-400" },
              { path: "/neos", name: "NEOs", hover: "hover:text-purple-400" },
              { path: "/library", name: "NASA Library", hover: "hover:text-pink-400" },
              { path: "/EarthImages", name: "Earth Images", hover: "hover:text-cyan-400" },
              { path: "/SpaceWeather", name: "Space Weather", hover: "hover:text-orange-400" },
            ].map((item) => (
              <li key={item.path} className="py-2 md:py-0">
                <Link
                  to={item.path}
                  className={`block px-4 transition-colors duration-300 ${item.hover}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Apod />} />
          <Route path="/mars" element={<MarsRover />} />
          <Route path="/ISSLiveTracker" element={<ISSLiveTracker />} />
          <Route path="/EarthImages" element={<EarthImages />} />
          <Route path="/MarsRoverPhotos" element={<MarsRoverPhotos />} />
          <Route path="/neos" element={<Neos />} />
          <Route path="/SpaceWeather" element={<SpaceWeather />} />
          <Route path="/library" element={<NasaLibrary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
