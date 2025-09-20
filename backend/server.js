const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get("/", (req, res) => {
  res.send("Proxy server is running!");
});

app.get("/api/movies", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${MOVIE_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
