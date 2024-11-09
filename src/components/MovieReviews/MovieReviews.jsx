import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/movies";

import styles from "./MovieReviews.module.css"

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {reviews.length ? (
        <div className={styles.reviews}>
          <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={styles.author}>Author: {review.author}</p>
              <p>«{review.content}»</p>
            </li>
          ))}
        </ul>
        </div>
      ) : (
        <p className={styles.reviews}>We don&apos;t have any reviews for this movie.</p>
      )}
    </div>
  );
};
