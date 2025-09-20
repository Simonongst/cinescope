const BASE_URL = "http://localhost:3000"

const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies`);
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

export default getPopularMovies;
