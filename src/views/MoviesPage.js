import * as API from '../services/movieAPI';
import { useState, useEffect } from 'react';
import qs from 'query-string';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const value = qs.parse(location.search)?.query || '';
  const [list, setList] = useState([]);

  const handleChangeInput = e => {
    e.preventDefault();
    if (e.target.elements.searching.value.trim() === '') {
      return alert('Enter a value to search.');
    }

    history.push({
      ...location,
      search: `query=${e.target.elements.searching.value}`,
    });
  };

  useEffect(() => {
    if (value === '') {
      return;
    }
    API.fetchQuery(value)
      .then(({ results }) => {
        setList(results);
      })
      .catch(error => console.log(error));
  }, [value]);

  return (
    <>
      <form onSubmit={handleChangeInput}>
        <input type="text" placeholder="Search movies" name="searching" />

        <button type="submit">Search</button>
      </form>

      {list && (
        <ul>
          {list.map(({ id, title, name, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${url}/${id}`,
                  state: {
                    backUrl: location,
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
                <p>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
