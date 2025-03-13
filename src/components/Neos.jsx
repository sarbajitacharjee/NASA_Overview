import { useEffect, useState } from "react";
import axios from "axios";

function Neos() {
  const [neos, setNeos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    

    const fetchNeos = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`
        );

        const neoData = Object.values(res.data.near_earth_objects || {}).flat().slice(0, 5);
        setNeos(neoData);
      } catch (error) {
        console.error("Error fetching NEO data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchNeos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Near Earth Objects (NEOs)</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {neos.map((neo) => (
          <li
            key={neo.id}
            className={`p-4 border rounded-lg shadow-lg ${
              neo.is_potentially_hazardous_asteroid ? "bg-red-500 text-white" : "bg-gray-800 text-gray-100"
            }`}
          >
            <h2 className="text-xl font-bold">{neo.name}</h2>
            <p>
              🔹 <strong>Diameter:</strong>{" "}
              {neo.estimated_diameter?.meters?.estimated_diameter_min?.toFixed(2)}m -{" "}
              {neo.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(2)}m
            </p>
            <p>
              📅 <strong>Close Approach:</strong>{" "}
              {neo.close_approach_data?.[0]?.close_approach_date
                ? new Date(neo.close_approach_data[0].close_approach_date).toDateString()
                : "N/A"}
            </p>
            <p>
              🚀 <strong>Velocity:</strong>{" "}
              {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour
                ? parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)
                : "N/A"}{" "}
              km/h
            </p>
            <p>
              ⚠️ <strong>Hazardous?</strong>{" "}
              {neo.is_potentially_hazardous_asteroid ? "Yes 🚨" : "No ✅"}
            </p>
            <a
              href={neo.nasa_jpl_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              View More on NASA 🚀
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Neos;
