import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import Apod from "./components/Apod";
import MarsRover from "./components/MarsRover";
import Neos from "./components/Neos";
import NasaLibrary from "./components/NasaLibrary";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-5">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center md:justify-center mb-6">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Nav Links */}
          <ul
            className={`absolute md:static left-0 top-16 w-full bg-gray-800 md:bg-transparent p-5 md:p-0 md:flex md:space-x-6 text-lg rounded-lg transition-all duration-300 ${
              isMenuOpen ? "block" : "hidden md:flex"
            }`}
          >
            <li className="py-2 md:py-0">
              <Link to="/" className="block px-4 hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>APOD</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/mars" className="block px-4 hover:text-red-400" onClick={() => setIsMenuOpen(false)}>Mars Rover</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/neos" className="block px-4 hover:text-green-400" onClick={() => setIsMenuOpen(false)}>NEOs</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/library" className="block px-4 hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>NASA Library</Link>
            </li>
          </ul>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Apod />} />
          <Route path="/mars" element={<MarsRover />} />
          <Route path="/neos" element={<Neos />} />
          <Route path="/library" element={<NasaLibrary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
