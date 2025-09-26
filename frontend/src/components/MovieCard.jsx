import { useEffect, useState } from "react";
import getMovies from "../services/cinescopeService";
import styles from "../css/MovieCard.module.css";

const MovieCard = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favouritedIds, setFavouritedIds] = useState([]);
  const [page, setPage] = useState(1);

  const loadMovies = async (pageNum) => {
    try {
      const allMovies = await getMovies(pageNum);
      setMovies((prev) => [...prev, ...allMovies]);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/favourites");
        const data = await response.json();
        const ids = data.map((fav) => fav["Movie ID"]);
        setFavouritedIds(ids);
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) return <p>Loading CineScope movies...</p>;
  if (error) return <p>{error}</p>;

  function onFavouriteClick(movie) {
    const isFavourited = favouritedIds.includes(movie.id);

    if (isFavourited) {
      fetch(`http://localhost:3000/api/favourites/${movie.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setFavouritedIds(favouritedIds.filter((id) => id !== movie.id));
          alert(`Removed "${movie.title}" from favourites.`);
        })
        .catch((err) => {
          console.error("Error removing favourite:", err);
          alert("Failed to remove favourite.");
        });
    } else {
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
        .then(() => {
          setFavouritedIds([...favouritedIds, movie.id]);
        })
        .catch((err) => {
          console.error("Error saving favourite:", err);
          alert("Failed to save favourite.");
        });
    }
  }

  const uniqueMovies = Array.from(
  new Map(movies.map((m) => [m.id, m])).values()
);

  return (
    <>
      <div className={styles.moviesGrid}>
        {uniqueMovies.map(
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
                      className={`${styles.favouriteBtn} ${
                        favouritedIds.includes(movie.id) ? styles.active : ""
                      }`}
                      onClick={() => onFavouriteClick(movie)}
                    >
                      ♥
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
        <div className={styles.loadMoreWrapper}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
