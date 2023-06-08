import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "/home/bhabesh/Documents/react/test-project/src/Search.svg";

const API_KEY = "http://www.omdbapi.com/?apikey=92e7f19b&";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchMovies = async (title) => {
    const movie = await fetch(`${API_KEY}&s=${title}`);
    const data = await movie.json();
    setMovies(data.Search); // Use "Search" instead of "search"
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []); // Add an empty dependency array to run the effect only once

  const handleSearch = () => {
    searchMovies(searchQuery);
  };

  return (
    <>
      <div className="app">
        <h1>BhabeshTheater</h1>
        <div className="search">
          <input
            placeholder="search for movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={SearchIcon} alt="search" onClick={handleSearch} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
