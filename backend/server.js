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
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Favourites";

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
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
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

app.get("/api/favourites", async (req, res) => {
  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  try {
    const response = await fetch(airtableUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error");
    }

    const favourites = data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    res.status(200).json(favourites);
  } catch (error) {
    console.error("Error fetching favourites from Airtable:", error);
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
});

app.delete("/api/favourites/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  try {
    const response = await fetch(`${airtableUrl}?filterByFormula={Movie ID}='${movieId}'`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data = await response.json();
    const recordToDelete = data.records[0];

    if (!recordToDelete) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    const deleteResponse = await fetch(`${airtableUrl}/${recordToDelete.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!deleteResponse.ok) {
      throw new Error("Failed to delete record");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({ error: "Failed to delete favourite" });
  }
});
