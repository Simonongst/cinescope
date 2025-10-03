import { useEffect, useState } from "react";
import styles from "../css/FavouriteCard.module.css";
import { fetchAllFavourites, deleteFavourite } from "../services/cinescopeService";
import SkeletonCard from "./SkeletonCard";

const FavouritesCard = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  // Fetch favourited movies from Airtable
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await fetchAllFavourites();
        setSkeletonCount(data.length);
        setFavourites(data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
        setSkeletonCount(0);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
        fetchFavourites();
    }, []);

  // Delete a favourite movie
  const handleDelete = async (movieId) => {
    try {
      const result = await deleteFavourite(movieId);
      if (result.success) {
        setFavourites((prev) =>
          prev.filter((fav) => fav["Movie ID"] !== movieId)
        );
      } else {
        console.error("Failed to delete favourite:", result.error);
      }
    } catch (err) {
      console.error("Error deleting favourite:", err);
    }
  };

  // Show loading skeletons
  if (loading) {
    return (
      <>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </>
    );
  }

  // Empty state if no favourites
  if (favourites.length === 0) {
    return (
      <div className={styles.emptyStateWrapper}>
        <div className={styles.favouritesEmpty}>
          <h2>No Favourite Movies Yet</h2>
          <p>Add your favourite movies here!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {favourites.map((record) => {
        const fields = record;
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
    </>
  );
};

export default FavouritesCard;
