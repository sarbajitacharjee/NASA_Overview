import { useEffect, useState } from "react";
import axios from "axios";

function Apod() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const fetchApod = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApod();
  }, []);

  return (
    <div className="text-center p-4 sm:p-6">
      {data ? (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold">{data.title}</h1>
          <p className="text-xs sm:text-sm text-gray-400">{data.date}</p>
          
          {/* Image with improved mobile responsiveness */}
          <div className="mt-4">
            <img 
              src={data.url} 
              alt={data.title} 
              className="w-full max-w-md sm:max-w-lg mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Text optimized for readability */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-300 px-2 sm:px-0">
            {data.explanation}
          </p>
        </div>
      ) : (
        <p className="text-lg font-semibold">Loading...</p>
      )}
    </div>
  );
}

export default Apod;
