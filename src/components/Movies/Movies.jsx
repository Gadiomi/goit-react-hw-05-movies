import { useState, useEffect } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

function Movies() {
  const [serchValue, setSearchValue] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentQuery = searchParams.get('q');

  useEffect(() => {
    if (!currentQuery) {
      return;
    }
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie?api_key=9472ead59ab5d905fc1e97a44f85f6b1',
      params: {
        query: `${currentQuery}`,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer 9472ead59ab5d905fc1e97a44f85f6b1',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSearchValue(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [currentQuery, search]);

  const hendleSabmit = e => {
    e.preventDefault();
    setSearch(true);

    if (currentQuery === '') Notiflix.Notify.failure('please writing value');

    setTimeout(() => {
      setSearch(false);
    }, 500);
  };

  const updateQueryString = e => {
    if (e.currentTarget.value.trim() === '') return setSearchParams();
    setSearchParams({ q: e.currentTarget.value.toLowerCase() });
  };

  const movie = serchValue.results;

  return (
    <>
      <form onSubmit={hendleSabmit} className={css.form}>
        <input
          type="text"
          onChange={updateQueryString}
          className={css.input}
          autocomplete="off"
          autofocus
          placeholder="Search movies"
        />
        <button type="submit" className={css.button}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1200px-Search_Icon.svg.png"
            width="30px"
            height="30px"
            alt=""
          />
        </button>
      </form>
      <ul className={css.conteiner_movie}>
        {movie !== null &&
          movie?.map(({ id, original_title }) => {
            return (
              <li key={id}>
                <Link state={{ from: location }} to={`/movies/${id}`}>
                  {original_title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default Movies;
