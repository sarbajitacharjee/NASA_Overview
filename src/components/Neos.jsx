import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

function Neos() {
  const [neos, setNeos] = useState([]);

  useEffect(() => {
    const fetchNeos = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        setNeos(Object.values(res.data.near_earth_objects).flat().slice(0, 5));
      } catch (error) {
        console.error("Error fetching NEO data:", error);
      }
    };
    fetchNeos();
  }, []);

  const getRiskLevel = (neo) => {
    if (neo.is_potentially_hazardous_asteroid) {
      return { level: "High Risk 🔴", color: "bg-red-600", message: "Potential Collision Risk! 🚨" };
    }
    if (parseFloat(neo.close_approach_data[0].miss_distance.kilometers) < 500000) {
      return { level: "Medium Risk 🟡", color: "bg-yellow-400", message: "Close Approach Warning! ⚠️" };
    }
    return { level: "Low Risk 🟢", color: "bg-green-600", message: "No Immediate Threat ✅" };
  };

  const chartData = neos.map((neo) => ({
    name: neo.name,
    speed: parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour),
    diameter: parseFloat(neo.estimated_diameter.meters.estimated_diameter_max),
  }));

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-100">🌍 Near Earth Objects (NEOs)</h1>

      {/* 🔭 NEO Cards Section */}
      <div className="p-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {neos.map((neo) => {
          const risk = getRiskLevel(neo);

          return (
            <li
              key={neo.id}
              className={`p-4 border rounded-lg shadow-lg bg-gray-800 text-gray-100`}
            >
              <h2 className="text-xl font-bold text-yellow-400">{neo.name}</h2>
              <p>
                🔹 <strong>Diameter:</strong>{" "}
                {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}m -{" "}
                {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m
              </p>
              <p>📅 <strong>Close Approach:</strong> {new Date(neo.close_approach_data[0].close_approach_date).toDateString()}</p>
              <p>
                🚀 <strong>Velocity:</strong>{" "}
                {parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h
              </p>
              <p>
                🌍 <strong>Miss Distance:</strong>{" "}
                {parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
              </p>
              <p>
                ⚠️ <strong>Hazardous?</strong>{" "}
                {neo.is_potentially_hazardous_asteroid ? "Yes 🚨" : "No ✅"}
              </p>
              
              {/* Risk Level Badge */}
              <div className={`mt-2 p-2 rounded-lg font-semibold ${risk.color}`}>
                {risk.level}
              </div>

              {/* Risk Warning */}
              <p className="mt-2 text-sm italic">{risk.message}</p>

              {/* NASA Link */}
              <a
                href={neo.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                View More on NASA 🚀
              </a>
            </li>
          );
        })}
      </ul>
    </div>

      {/* 📊 Chart Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">📊 Asteroid Speed & Diameter</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#ffffff", borderRadius: "8px", border: "1px solid #64748b" }} />
            <Legend />
            <Bar dataKey="speed" fill="#38bdf8" name="Speed (km/h)" />
            <Bar dataKey="diameter" fill="#facc15" name="Max Diameter (m)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Neos;
