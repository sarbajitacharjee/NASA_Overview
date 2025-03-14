import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import issIcon from "../../public/iss.png"; // Add a custom ISS icon

function ISSLiveTracker() {
  const [issPosition, setIssPosition] = useState({ lat: 0, lon: 0 });
  const [astronauts, setAstronauts] = useState([]);
  const [issSpeed, setIssSpeed] = useState(null);
  const [prevPosition, setPrevPosition] = useState(null);

  useEffect(() => {
    const fetchISSData = async () => {
      try {
        const issRes = await axios.get("http://api.open-notify.org/iss-now.json");
        const newPosition = {
          lat: parseFloat(issRes.data.iss_position.latitude),
          lon: parseFloat(issRes.data.iss_position.longitude),
        };
        
        if (prevPosition) {
          const distance = Math.sqrt(
            Math.pow(newPosition.lat - prevPosition.lat, 2) +
            Math.pow(newPosition.lon - prevPosition.lon, 2)
          );
          setIssSpeed((distance * 111.32 * 60).toFixed(2)); // Approximate km/h speed
        }
        
        setPrevPosition(newPosition);
        setIssPosition(newPosition);
      } catch (error) {
        console.error("Error fetching ISS data:", error);
      }
    };

    const fetchAstronauts = async () => {
      try {
        const astroRes = await axios.get("http://api.open-notify.org/astros.json");
        setAstronauts(astroRes.data.people.filter((person) => person.craft === "ISS"));
      } catch (error) {
        console.error("Error fetching astronaut data:", error);
      }
    };

    fetchISSData();
    fetchAstronauts();
    const interval = setInterval(fetchISSData, 5000); // Auto-update every 5 sec
    return () => clearInterval(interval);
  }, [prevPosition]);

  const customISSIcon = new L.Icon({
    iconUrl: issIcon,
    iconSize: [50, 50],
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">🛰️ ISS Live Tracking</h1>
      
      {/* 🌍 ISS Location Map */}
      <div className="h-96 w-full rounded-lg shadow-lg overflow-hidden">
        <MapContainer center={[issPosition.lat, issPosition.lon]} zoom={3} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[issPosition.lat, issPosition.lon]} icon={customISSIcon}>
            <Popup>
              🌍 ISS is currently here!<br />
              🌠 Speed: {issSpeed ? `${issSpeed} km/h` : "Calculating..."}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* 🚀 ISS Speed Info */}
      <h2 className="text-2xl font-semibold mt-6 mb-2 text-center">🚀 ISS Speed</h2>
      <p className="text-center text-lg font-bold bg-gray-800 text-white p-2 rounded-lg">
        {issSpeed ? `${issSpeed} km/h` : "Fetching speed..."}
      </p>

      {/* 👨‍🚀 Astronauts in ISS */}
      <h2 className="text-2xl font-semibold mt-6 mb-2 text-center">👨‍🚀 Astronauts Currently in ISS</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {astronauts.map((astronaut) => (
          <div key={astronaut.name} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">{astronaut.name}</h3>
            <p className="text-lg">🚀 Aboard: {astronaut.craft}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ISSLiveTracker;