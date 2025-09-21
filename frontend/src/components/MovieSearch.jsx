import styles from '../css/MovieSearch.module.css';

const MovieSearch = ({handleSearch, searchQuery, setSearchQuery}) => {
  return (
    <div>
        <form onSubmit={handleSearch} className={styles.searchForm}>
            <input 
                type="text"
                placeholder="Search for movies..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
        </form>
    </div>
  )
}

export default MovieSearch