import { useEffect, useState } from "react";
import axios from "axios";

function NasaLibrary() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const res = await axios.get(`https://images-api.nasa.gov/search?q=earth`);
      setImages(res.data.collection.items.slice(0, 6));
    };
    fetchLibrary();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {images.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={item.links?.[0]?.href} alt="NASA Image" className="w-full h-48 object-cover" />
          <p className="p-2 text-center font-semibold">{item.data[0].title}</p>
          <div className="text-center mb-2">
            <a 
              href={`https://images.nasa.gov/details/${item.data[0].nasa_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on NASA Website
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NasaLibrary;
