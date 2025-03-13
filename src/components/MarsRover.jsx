import { useEffect, useState } from "react";
import axios from "axios";

function MarsRover() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const fetchPhotos = async () => {
      const res = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
      );
      setPhotos(res.data.photos.slice(0, 10));
    };
    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {photos.length > 0 ? (
        photos.map((photo) => (
          <div key={photo.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={photo.img_src} alt="Mars Rover" className="w-full h-48 object-cover" />
            <p className="p-2 text-center">{photo.camera.full_name}</p>
          </div>
        ))
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export default MarsRover;
