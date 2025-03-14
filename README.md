# 🚀 NASA NEO Tracker App

A modern web application that fetches real-time **Near Earth Objects (NEOs)** from NASA's API, displaying asteroid details, risk analysis, and interactive visualizations. 🌍✨

## 📌 Features

✅ **Live NEO Data** - Fetches asteroid data from NASA API
✅ **Beautiful Card Layout** - Displays asteroid details in an elegant format
✅ **Risk Level Indicators** - Highlights potential hazards with color-coded labels
✅ **NASA Links** - Direct links to official NASA JPL pages for each asteroid
✅ **Interactive Bar Chart** - Visualizes asteroid speed & size using Recharts
✅ **Fully Responsive** - Works seamlessly on desktop & mobile

---

## 🎥 Demo
[🔗 Live Demo](https://nasa-daily-overview.vercel.app/)

![Home Screenshot](./public/Screenshot%202025-03-14%20012024.png)

---

## 🛠 Tech Stack

- **React** (Vite Setup) ⚛️
- **Tailwind CSS** 🎨
- **NASA API** (Near-Earth Object Feed) 🛰
- **Recharts** 📊
- **Axios** (API Fetching) 🔗

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/nasa-neo-tracker.git
cd nasa-neo-tracker
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Create an `.env` File
```sh
touch .env
```
Add your NASA API Key:
```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

### 4️⃣ Run the App
```sh
npm run dev
```

---

## 📸 Screenshots

### 🔭 **Asteroid Details Page**
![Asteroid Cards](./public/Screenshot%202025-03-14%20012114.png)

### 📊 **Speed & Size Visualization**
![Mars Rover ](./public/Screenshot%202025-03-14%20012052.png)

---

## 🌍 API Reference
The app uses NASA's [Near-Earth Object API](https://api.nasa.gov/) to fetch asteroid data.
```sh
GET https://api.nasa.gov/neo/rest/v1/feed?api_key=YOUR_NASA_API_KEY
```

---

## 🎯 Future Enhancements
🔹 **3D Globe for NEO Paths** 🌍
🔹 **Real-Time NEO Tracking** 📡
🔹 **Dark Mode Support** 🌙

---

## 📜 License
MIT License © 2025 Sarbajit Acharjee

---

### 💡 **Have Suggestions?**
Feel free to open an issue or contribute to this project!

---

🚀 *Happy Coding!*
