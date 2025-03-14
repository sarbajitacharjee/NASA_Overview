import { useEffect, useState } from "react";
import axios from "axios";

function SpaceWeather() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSpaceWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/DONKI/notifications?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        setEvents(res.data.slice(0, 6)); // Get latest 6 events
      } catch (error) {
        console.error("Error fetching space weather data:", error);
      }
    };
    fetchSpaceWeather();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-400 drop-shadow-lg">
        ☀️ Space Weather Alerts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={index}
              className="relative bg-gray-900 bg-opacity-60 backdrop-blur-lg text-white p-6 rounded-xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-transparent rounded-xl pointer-events-none"></div>
              <h2 className="text-xl font-semibold text-yellow-400 mb-3 drop-shadow-md">
                {event.messageType}
              </h2>
              <p className="text-sm text-gray-400">
                <strong>Issued:</strong> {new Date(event.messageIssueTime).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                <strong>Source:</strong> {event.messageID}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Description:</strong> {event.messageBody ? event.messageBody.slice(0, 100) + '...' : "No details available."}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Affected Regions:</strong> {event.messageType.includes("Warning") ? "High impact areas" : "General observations"}
              </p>
              <a
                href={event.messageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 mt-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition duration-300 shadow-md"
              >
                🔗 Read More
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 w-full text-lg font-medium">No space weather alerts available.</p>
        )}
      </div>
    </div>
  );
}

export default SpaceWeather;
