import styles from "../css/MovieSearch.module.css";

const MovieSearch = ({ handleSearch, searchQuery, setSearchQuery }) => {
  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search for movies..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default MovieSearch;
