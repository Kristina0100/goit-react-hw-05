import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api/movies";

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
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
             <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt="Actor photo" />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};