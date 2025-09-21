
const MovieSearch = ({handleSearch, searchQuery, setSearchQuery}) => {
  return (
    <div>
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    </div>
  )
}

export default MovieSearch