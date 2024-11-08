import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/movies";

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
      <h3>Reviews</h3>
      {reviews.length ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>Author: {review.author}</strong>
              <p>«{review.content}»</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for this movie.</p>
      )}
    </div>
  );
};
