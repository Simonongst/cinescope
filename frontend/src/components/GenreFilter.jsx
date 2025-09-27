import { useEffect, useState } from "react";
import { getGenres } from "../services/cinescopeService";
import styles from "../css/GenreFilter.module.css";

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getGenres();
      setGenres(genreList);
    };
    fetchGenres();
  }, []);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.genreFilter}>
      <h3>Filter by Genre</h3>
      <div className={styles.genreList}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`${styles.genreTag} ${
              selectedGenres.includes(genre.id) ? styles.active : ""
            }`}
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {selectedGenres.length > 0 && (
        <button
          className={styles.clearFiltersBtn}
          onClick={() => setSelectedGenres([])}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default GenreFilter;
