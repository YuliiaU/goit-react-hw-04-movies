import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as API from '../services/movieAPI';

export default function MovieDetailsPage() {
  const { moviesId } = useParams();

  const [actors, setActors] = useState(null);

  useEffect(() => {
    API.fetchCredits(moviesId).then(setActors);
  }, [moviesId]);
  return (
    <>
      {actors && (
        <ul>
          {actors.cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <b>{name}</b>
              <p>{`Character: ${character}`}</p>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                }
                alt="name"
                width="200px"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
