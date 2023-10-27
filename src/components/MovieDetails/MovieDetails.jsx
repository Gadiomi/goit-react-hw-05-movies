import { useState, useEffect, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Skeleton from './Skeleton';
import css from './MovieDetails.module.css';

function MovieDetails() {
  const { movieid } = useParams();
  const location = useLocation();
  const backLink = location.state?.from ?? 'movies';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloadind] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieid}?api_key=9472ead59ab5d905fc1e97a44f85f6b1`,
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data);
      })
      .then(() => setIsloadind(false))
      .catch(function (error) {
        console.error(error);
      });
  }, [movieid]);

  const genresd = movies.genres?.map(genre => genre.name);
  const { original_title, popularity, overview, poster_path } = movies;
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          <Link to={backLink}>Go back</Link>
          <div className={css.conteiner}>
            <img
              height={300}
              width={200}
              className={css.img}
              src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
              alt={original_title}
            />
            <div>
              <h2 className={css.title}>{original_title}</h2>
              <p className={css.score}>User score:{popularity}</p>
              <h3 className={css.overview}>Overview</h3>
              <p className={css.text}>{overview}</p>
              <h3 className={css.Genres}>Genres</h3>
              <ul className={css.list}>
                {genresd?.map(genres => {
                  return <li key={nanoid()}>{genres}</li>;
                })}
              </ul>
            </div>
          </div>
          <ul>
            <h4>Additional information </h4>
            <li>
              <Link to="cast" state={location.state}>
                cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={location.state}>
                reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
