import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import {Suspense } from "react";
import { getMovieById } from "../../api/movies";

import styles from "./MovieDetailsPage.module.css"

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
        <div className={styles.page}>
          
          <div className={styles.imgwrap}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie poster" />
            <div className={styles.wrap}>
              <h1 className={styles.title}>{movie.title}</h1>
            <p>User score: {movie.vote_average * 10}%</p>
          <h2 className={styles.heading}>Overview</h2>
          <p>{movie.overview}</p>
          <h3 className={styles.heading}>Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
          <div>
            <div className={styles.additional}>
              <p className={styles.add_title}>Additional information</p>
                <ul className={styles.list}>
                  <li className={styles.item}>
                    <Link to="credits" state={{ from: location.state?.from }}>Cast</Link>
                  </li>
                  <li className={styles.item}>
                    <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
                  </li>
                </ul>
             <Suspense fallback={<div>Loading subpage...</div>}>
              <Outlet />
             </Suspense>
            </div>
           <button type="button" onClick={goBack} className={styles.btn}>Go back</button>
          </div>
        </div>
      )}
    </div>
  );
};