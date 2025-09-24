const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const MOVIE_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get("/", (req, res) => {
  res.send("Proxy server is running!");
});

app.get("/api/movies", async (req, res) => {
  try {
    const response = await fetch(
      `${MOVIE_BASE_URL}/movie/popular?api_key=${MOVIE_API_KEY}`
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

app.use(express.json());

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Favourites';

app.post("/api/favourites", async (req, res) => {
  const { title, movieId, posterUrl, releaseDate, overview } = req.body;

  const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;

  const airtablePayload = {
    records: [
      {
        fields: {
          "Movie ID": movieId,
          "Movie Title": title,
          "Poster URL": posterUrl,
          "Release Date": releaseDate,
          "Overview": overview,
        },
      },
    ],
  };

  try {
    const response = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtablePayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error");
    }

    res.status(201).json({ success: true, airtableResponse: data });
  } catch (error) {
    console.error("Error saving to Airtable:", error);
    res.status(500).json({ error: "Failed to save favourite movie" });
  }
});