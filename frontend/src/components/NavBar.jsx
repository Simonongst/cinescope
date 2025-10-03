import { Link } from "react-router-dom";
import styles from "../css/NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link to="/">CineScope</Link>
      </div>
      <div className={styles.navbarLinks}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/favourites" className={styles.navLink}>
          Favourite
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
