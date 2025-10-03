const BASE_URL = "http://localhost:3000";

export const getMovies = async (page = 1, genres = []) => {
  const genreParam = genres.length ? `&with_genres=${genres.join(",")}` : "";
  try {
    const response = await fetch(
      `${BASE_URL}/api/movies?page=${page}${genreParam}`
    );
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("CineScope Service Error:", error);
    return [];
  }
};

export const searchMovies = async (query, page = 1, genres = []) => {
  const genreParam = genres.length ? `&with_genres=${genres.join(",")}` : "";
  try {
    const response = await fetch(
      `${BASE_URL}/api/search?query=${encodeURIComponent(
        query
      )}&page=${page}${genreParam}`
    );
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Search Service Error:", error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/genres`);
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Genre Fetch Error:", error);
    return [];
  }
};

export const getFavourites = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/favourites`);
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }
    const data = await response.json();
    return data.map((fav) => fav["Movie ID"]);
  } catch (error) {
    console.error("Error loading favourites:", error);
    return [];
  }
};

export const addFavourite = async (movie) => {
  try {
    const response = await fetch(`${BASE_URL}/api/favourites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        releaseDate: movie.release_date,
        overview: movie.overview,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving favourite:", error);
    return null;
  }
};

export const fetchAllFavourites = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/favourites`);
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response from server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading favourites:", error);
    return [];
  }
};

export const deleteFavourite = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/favourites/${movieId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting favourite:", error);
    return null;
  }
};
