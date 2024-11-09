import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";

import styles from "./HomePage.module.css";

export default function HomePage() {

const [movies, setMovies] = useState(null); 
const [error, setError] = useState(null);

    useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      };
      };
        fetchTrendingMovies();
    }, []);
  
  return (
    <div>
      <h1 className={styles.title}> Trending today </h1>
       {error && <p>Error: {error}</p>}
      <MovieList movies={movies} />
    </div>
  )
}

