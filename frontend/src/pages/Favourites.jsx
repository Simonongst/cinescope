import styles from "../css/Favourites.module.css";
import FavouritesCard from "../components/FavouriteCard";

const Favourites = () => {
  return (
    <div className={styles.favourites}>
      <h2>Your Favourite Movies</h2>
      <div className={styles.moviesGrid}>
        <FavouritesCard />
      </div>
    </div>
  );
};

export default Favourites;
