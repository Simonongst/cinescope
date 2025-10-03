import { useEffect, useState } from "react";
import { getMovies, searchMovies } from "../services/cinescopeService";
import styles from "../css/MovieCard.module.css";
import SkeletonCard from "./SkeletonCard";

const MovieCard = ({ submittedQuery, selectedGenres }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favouritedIds, setFavouritedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadMovies = async (pageNum) => {
    setLoading(true);
    try {
      const results = submittedQuery.trim()
        ? await searchMovies(submittedQuery, pageNum, selectedGenres)
        : await getMovies(pageNum, selectedGenres);

      setMovies((prev) => [...prev, ...results]);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialLoad = page === 1;
    if (initialLoad) setMovies([]);
    loadMovies(page);
  }, [page, submittedQuery, selectedGenres]);

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

  if (loading) {
    return (
      <div className={styles.moviesGrid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

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
        })
        .catch((err) => {
          console.error("Error removing favourite:", err);
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
        });
    }
  }

  const uniqueMovies = Array.from(
    new Map(movies.map((m) => [m.id, m])).values()
  ).filter((movie) => movie.poster_path);

  if (!loading && uniqueMovies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No movies found for the selected genres or search query.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.moviesGrid}>
        {uniqueMovies.map((movie) => (
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
                  disabled={favouritedIds.includes(movie.id)}
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
        ))}
        <div className={styles.loadMoreWrapper}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load More
          </button>
        </div>
      </div>
      {showScrollTop && (
        <button
          className={`${styles.scrollTopBtn} ${styles.show}`}
          onClick={scrollToTop}
        >
          ⇧
        </button>
      )}
    </>
  );
};

export default MovieCard;
