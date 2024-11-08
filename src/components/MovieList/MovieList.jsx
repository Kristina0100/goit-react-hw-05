import { Link, useLocation } from 'react-router-dom';

import styles from "./MovieList.module.css"

const MovieList = ({ movies }) => {
     const location = useLocation();
  return (
    <div>
      {/* {location.pathname.includes('trending') {
      
      }} */}
      <ul className={styles.list}>
        {movies && movies.map((movie) => (
          <li key={movie.id} className={styles.title}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;