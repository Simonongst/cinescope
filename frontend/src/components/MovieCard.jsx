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

  function onFavouriteClick() {
    alert("clicked");
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
                    onClick={onFavouriteClick}
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
