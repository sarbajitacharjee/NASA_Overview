import { useEffect, useState } from "react";
import axios from "axios";

function NasaLibrary() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const fetchLibrary = async () => {
      const res = await axios.get(
        `https://images-api.nasa.gov/search?q=earth`
      );
      setImages(res.data.collection.items.slice(0, 6));
    };
    fetchLibrary();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {images.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={item.links?.[0]?.href} alt="NASA Image" className="w-full h-48 object-cover" />
          <p className="p-2 text-center">{item.data[0].title}</p>
        </div>
      ))}
    </div>
  );
}

export default NasaLibrary;
