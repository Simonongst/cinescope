import { useEffect, useState } from "react";
import styles from "../css/Favourites.module.css";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/favourites");
        const data = await response.json();
        setFavourites(data);
      } catch (err) {
        console.error("Error loading favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) return <p>Loading favourites...</p>;

  if (favourites.length === 0) {
    return (
      <div className={styles.favouritesEmpty}>
        <h2>No Favourite Movies Yet</h2>
        <p>Add your favourite movies here!</p>
      </div>
    );
  }

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/favourites/${movieId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (result.success) {
        setFavourites(favourites.filter((fav) => fav["Movie ID"] !== movieId));
      } else {
        console.error("Failed to delete favourite:", result.error);
      }
    } catch (err) {
      console.error("Error deleting favourite:", err);
    }
  };

  return (
    <div className={styles.favourites}>
      <h2>Your Favourite Movies</h2>
      <div className={styles.moviesGrid}>
        {favourites.map((record) => {
          const fields = record; // fields are flattened in backend
          if (!fields || !fields["Poster URL"]) return null;

          return (
            <div key={record.id} className={styles.movieCard}>
              <div className={styles.moviePoster}>
                <img
                  src={fields["Poster URL"]}
                  alt={fields["Movie Title"] || "Untitled"}
                />
                <div className={styles.movieOverlay}>
                  <button
                    className={styles.favouriteBtn}
                    onClick={() => handleDelete(fields["Movie ID"])}
                  >
                    ⛌
                  </button>
                </div>
              </div>
              <div className={styles.movieInfo}>
                <h3>{fields["Movie Title"]}</h3>
                <h3>{fields["Release Date"]}</h3>
                <p>{fields["Overview"]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;
