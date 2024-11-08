import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import {Suspense } from "react";
import { getMovieById } from "../api/movies";

export default function MovieDetailsPage() {
  // loading, error
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const backURL = location.state?.from || '/movies';
  const goBack = () => navigate(backURL);

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
              <li>
                <Link to="credits">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
             <Suspense fallback={<div>Loading subpage...</div>}>
              <Outlet />
             </Suspense>
            <button type="button" onClick={goBack}>Go back</button>
          </div>
        </div>
      )}
    </div>
  );
};