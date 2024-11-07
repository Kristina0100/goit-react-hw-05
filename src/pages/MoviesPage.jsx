import {  useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovie } from "../api/movies";

import MovieDetailsPage from "./MovieDetailsPage";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  // const {movieId} = useParams();
  const [movies, setMovies] = useState(null); 
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const searchValue = searchParams.get("query");

  const onSearch = (searchTerm) => {
    setSearchParams({query: searchTerm});
  };
  
  useEffect(() => {
    if (searchValue === null) return;
    const fetchMoviesBySearchValue = async () => {
      try {
        const data = await searchMovie(searchValue);
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      };
      };
        fetchMoviesBySearchValue();
  }, [searchValue]);
  
    const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

    const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div>
      <form onSubmit={handleSearch} >
        <input type="text"   
          name="searchTerm"
          placeholder="Search movie"
          value={searchTerm}
          onChange={handleInputChange}/>
        <button type="submit">Search</button>
      </form>
      
      {error && <p>Error: {error}</p>}
      
      {movies && <MovieList movies={movies} />}
      <MovieDetailsPage/>
    </div>
  )
}

export default MoviesPage