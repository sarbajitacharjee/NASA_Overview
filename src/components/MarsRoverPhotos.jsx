/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function MarsRoverPhotos() {
  const [photos, setPhotos] = useState([]);
  const [rover, setRover] = useState("curiosity");
  const [date, setDate] = useState("2025-03-01");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        setPhotos(res.data.photos.slice(0, 12));
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
      }
    };

    fetchPhotos();
  }, [rover, date]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="p-4"
    >
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-center mb-4"
      >
        🚀 Mars Rover Photos
      </motion.h1>

      {/* Rover Selection & Date Picker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-4"
      >
        <select
          value={rover}
          onChange={(e) => setRover(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-gray-800 text-white"
        >
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="perseverance">Perseverance</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 border rounded-lg bg-gray-800 text-white"
        />
      </motion.div>

      {/* Mars Rover Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-2 border rounded-lg shadow-lg bg-gray-900 text-white"
            >
              <img
                src={photo.img_src}
                alt={`Mars Rover - ${photo.camera.full_name}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-2 text-center">📷 {photo.camera.full_name}</p>
              <p className="text-center">📅 {photo.earth_date}</p>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center col-span-full"
          >
            No photos found for this date. Try another!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default MarsRoverPhotos;
