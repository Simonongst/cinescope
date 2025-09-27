import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../css/MovieCard.module.css";

const SkeletonCard = () => (
  <div className={styles.movieCard}>
    <div className={styles.moviePoster}>
      <Skeleton height={500} width="100%" />
    </div>
    <div className={styles.movieInfo}>
      <h3><Skeleton width={180} /></h3>
      <h3><Skeleton width={120} /></h3>
      <p><Skeleton count={3} /></p>
    </div>
  </div>
);

export default SkeletonCard;
