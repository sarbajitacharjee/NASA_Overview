import { useEffect, useState } from "react";
import axios from "axios";

function Apod() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const fetchApod = async () => {
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      );
      setData(res.data);
    };
    fetchApod();
  }, []);

  return (
    <div className="text-center">
      {data ? (
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-sm text-gray-400">{data.date}</p>
          <img src={data.url} alt={data.title} className="mx-auto mt-4 max-w-lg rounded-lg shadow-lg" />
          <p className="mt-4">{data.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Apod;
