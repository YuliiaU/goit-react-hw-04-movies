import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as API from '../services/movieAPI';

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    API.fetchReviews(moviesId).then(setReviews);
  }, [moviesId]);
  return (
    <>
      {reviews &&
        (reviews.results.length > 0 ? (
          <ul>
            {reviews.results.map(({ id, author, content }) => (
              <li key={id}>
                <b>{`Author: ${author}`}</b>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews for this movie.</p>
        ))}
    </>
  );
}
