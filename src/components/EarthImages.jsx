import { useEffect, useState } from "react";
import axios from "axios";

function EpicImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchEpicImages = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/EPIC/api/natural/images?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        setImages(res.data.slice(0, 6)); // Get latest 6 images
      } catch (error) {
        console.error("Error fetching EPIC images:", error);
      }
    };
    fetchEpicImages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌍 Earth from Space (EPIC)</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {images.map((img) => {
          const date = img.date.split(" ")[0].replace(/-/g, "/");
          const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${img.image}.png`;
          return (
            <div key={img.identifier} className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
              <img src={imgUrl} alt={img.caption} className="rounded-lg w-full mb-4" />
              <h2 className="text-lg font-semibold">{img.caption}</h2>
              <p><strong>Date:</strong> {img.date}</p>
              <p><strong>Latitude:</strong> {img.centroid_coordinates.lat.toFixed(2)}</p>
              <p><strong>Longitude:</strong> {img.centroid_coordinates.lon.toFixed(2)}</p>
              <a href={imgUrl} target="_blank" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Full Image</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EpicImages;
