import PageHeading from '../components/PageHeading/PageHeading';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as API from '../services/movieAPI';
import styles from './PageStyles.module.css';

export default function HomePage() {
  const { pathname } = useLocation();

  const [list, setList] = useState([]);

  useEffect(() => {
    API.fetchMoviesTrending()
      .then(({ results }) => {
        setList(results);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={styles.homePage}>
      <PageHeading text="Trending today" />

      <ul className={styles.homeList}>
        {list.map(({ id, title, name, poster_path }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `Movies/${id}`,
                state: {
                  backUrl: pathname,
                },
              }}
            >
              <img
                src={
                  poster_path !== null
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                }
                alt={title ?? name}
                width="280px"
                height="450px"
              />
              <p>{title ?? name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
