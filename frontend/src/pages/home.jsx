import { useState } from "react"
import MovieCard from "../components/MovieCard"
import MovieSearch from "../components/MovieSearch"

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery("");
}

  return (
    <div className="home">
        <MovieSearch handleSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <div className="movies-grid">
            <MovieCard searchQuery={searchQuery}/>
        </div>
    </div>
  )
}

export default Home