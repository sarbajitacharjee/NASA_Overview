import { useState, useEffect } from "react";
import axios from "axios";

function EarthImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/EPIC/api/natural?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        setImages(res.data.slice(0, 5)); // Show last 5 images
      } catch (error) {
        console.error("Error fetching Earth images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">🌍 Latest Earth Images (EPIC)</h1>

      {images.length === 0 ? (
        <p className="text-center text-gray-400">📡 No images available...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {images.map((img) => {
            const date = img.date.split(" ")[0].replace(/-/g, "/"); // Format date for URL
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${img.image}.png`;
            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${img.centroid_coordinates.lat},${img.centroid_coordinates.lon}`;

            return (
              <div key={img.identifier} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <img src={imageUrl} alt="Earth from Space" className="rounded-lg w-full h-48 object-cover" />
                <h2 className="text-lg font-semibold mt-2">{img.date}</h2>
                <p>📍 Lat: {img.centroid_coordinates.lat}, Lon: {img.centroid_coordinates.lon}</p>
                <p>☀️ Sun Angle: {img.sun_j2000_position.x.toFixed(2)}</p>
                <p>🌕 Moon Distance: {img.lunar_j2000_position.x.toFixed(2)} km</p>
                <p>🛰️ Altitude: {img.dscovr_j2000_position.x.toFixed(2)} km</p>
                <a href={imageUrl} target="_blank" className="text-blue-400 hover:underline mt-2 inline-block">
                  🔍 View Full Image
                </a>
                <br />
                <a href={googleMapsLink} target="_blank" className="text-green-400 hover:underline inline-block">
                  🗺️ View Location on Map
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EarthImages;
