import PageHeading from '../components/PageHeading/PageHeading';
import styles from './PageStyles.module.css';
import { useParams } from 'react-router';
import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as API from '../services/movieAPI';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const { state } = useLocation();
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();

  const [movie, setMovie] = useState(null);

  const handleGoBack = () => {
    history.push(state.backUrl);
  };

  useEffect(() => {
    API.fetchMovieById(moviesId)
      .then(setMovie)
      .catch(error => console.log(error));
  }, [moviesId]);

  return (
    <>
      <PageHeading text={`Movie`} />

      {movie && (
        <>
          <button type="button" className={styles.btn} onClick={handleGoBack}>
            Go back
          </button>
          <div className={styles.movieInfo}>
            <img
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
              }
              alt={movie.title ?? movie.name}
            />

            <div>
              <h1>{movie.title}</h1>
              <p>User Score: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
                ;
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      backUrl: state.backUrl,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      backUrl: state.backUrl,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path={`${path}/cast`} exact>
              <Cast />
            </Route>

            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
