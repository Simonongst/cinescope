import { useEffect, useState } from "react";
import getPopularMovies from "../services/cinescopeService";
import styles from "../css/MovieCard.module.css";

const MovieCard = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  if (loading) return <p>Loading CineScope movies...</p>;
  if (error) return <p>{error}</p>;

function onFavouriteClick(movie) {
  fetch("http://localhost:3000/api/favourites", {
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
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Saved to Airtable:", data);
      alert(`Added "${movie.title}" to favourites!`);
    })
    .catch((err) => {
      console.error("Error saving favourite:", err);
      alert("Failed to save favourite.");
    });
}

  return (
    <div className={styles.moviesGrid}>
      {movies.map(
        (movie) =>
          movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
            <div className={styles.movieCard} key={movie.id}>
              <div className={styles.moviePoster}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className={styles.movieOverlay}>
                  <button
                    className={styles.favouriteBtn}
                      onClick={() => onFavouriteClick(movie)}
                  >
                    ♥︎
                  </button>
                </div>
              </div>
              <div className={styles.movieInfo}>
                <h3>{movie.title}</h3>
                <h3>{movie.release_date}</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default MovieCard;
