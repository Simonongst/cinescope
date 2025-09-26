const BASE_URL = "http://localhost:3000"

export const getMovies = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies?page=${page}`);
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

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search?query=${encodeURIComponent(query)}&page=${page}`);
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
