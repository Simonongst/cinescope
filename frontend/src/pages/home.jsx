import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieSearch from "../components/MovieSearch";
import styles from '../css/Home.module.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className={styles.home}>
      <MovieSearch
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className={styles.moviesGrid}>
        <MovieCard searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
