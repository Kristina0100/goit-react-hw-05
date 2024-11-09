import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/movies";

import styles from "./MovieCast.module.css"
import actorDefault from '../../images/actorDefault.png';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className={styles.cast}>
      <ul className={styles.list}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : actorDefault}
              // src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              className={`${styles.photo} ${styles.default}`}
              alt="Actor photo" />
            <p className={styles.name}>{actor.name}</p>
            <p>Character: {actor.character ? actor.character : '???'}</p>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};