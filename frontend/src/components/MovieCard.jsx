import { useEffect, useState } from "react";
import getPopularMovies from "../services/cinescopeService";

const MovieCard = ({searchQuery}) => {
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
    alert('clicked')
  }

  return (
    <div className="movie-card">
      {movies.map((movie) => movie.title.toLowerCase().startsWith(searchQuery) && (
        <div className="movie-poster" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button className="favourite-btn" onClick={onFavouriteClick}>
              ♥︎
            </button>
          </div>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
