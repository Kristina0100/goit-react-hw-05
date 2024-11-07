import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getMovieById } from "../api/movies";

// import MovieCast from './components/MovieCast/MovieCast'
// import MovieReviews from "./components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  // loading, error
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    };
    if (movieId) fetchMovieById();
  }, [movieId]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {movie && (
        <div>
          <div>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie poster" />
            <h1>{movie.title}</h1>
            <p>User score: {movie.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li> <NavLink to={`/movie/${movieId}/credits`}>Cast</NavLink>
          </li>
              <li><NavLink to={`/movie/${movieId}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;