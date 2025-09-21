import styles from "../css/Favourites.module.css";

const Favourites = () => {
  return (
    <div className={styles.favouritesEmpty}>
        <h2>No Favourite Movies Yet</h2>
        <p>Add your favourites movies here!</p>
    </div>
  )
}

export default Favourites