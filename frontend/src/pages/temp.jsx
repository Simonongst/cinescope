import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieSearch from "../components/MovieSearch";
import GenreFilter from "../components/GenreFilter";
import styles from "../css/Home.module.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  return (
    <div className={styles.home}>
      <MovieSearch
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <GenreFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <div className={styles.moviesGrid}>
        <MovieCard
          submittedQuery={submittedQuery}
          selectedGenres={selectedGenres}
        />
      </div>
    </div>
  );
};

export default Home;
