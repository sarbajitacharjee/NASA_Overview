import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Apod from "./components/Apod";
import MarsRover from "./components/MarsRover";
import Neos from "./components/Neos";
import NasaLibrary from "./components/NasaLibrary";

function App() {
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-5">
        <nav className="flex justify-center space-x-6 text-lg">
          <Link to="/" className="hover:text-yellow-400">APOD</Link>
          <Link to="/mars" className="hover:text-red-400">Mars Rover</Link>
          <Link to="/neos" className="hover:text-green-400">NEOs</Link>
          <Link to="/library" className="hover:text-blue-400">NASA Library</Link>
        </nav>
        
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
