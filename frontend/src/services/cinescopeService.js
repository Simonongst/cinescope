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
