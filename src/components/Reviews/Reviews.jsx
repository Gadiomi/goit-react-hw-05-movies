import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

function Reviews() {
  const { movied } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movied}/reviews?api_key=9472ead59ab5d905fc1e97a44f85f6b1`,
      params: { language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setReviews(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [movied]);
  return reviews.length === 0 ? (
    <h3>Reviews.</h3>
  ) : (
    <ul>
      {reviews?.map(review => {
        return (
          <li key={review.id} className={css.Item}>
            <h4 className={css.Title}>Author:{review.autthor}</h4>
            <p className={css.Text}>Text:{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
}
export default Reviews;
