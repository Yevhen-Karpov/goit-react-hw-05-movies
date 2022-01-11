import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import PageHeading from '../PageHeading/PageHeading';
import moviesApi from '../../services/moviesApi';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast' /*webpackChunkName: 'Cast'*/));
const Reviews = lazy(() =>
  import('../Reviews/Rewievs' /*webpackChunkName: 'Reviews'*/),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  const [movie, setMovie] = useState(null);
  const [visibleCast, setVisibleCast] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(false);

  const history = useHistory();
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchApiMovieDetails(movieId).then(setMovie);
    scroll.scrollMore(100);
  }, [movieId]);

  const onVisibleCast = () => {
    if (visibleReviews) {
      setVisibleReviews(false);
    }
    setVisibleCast(true);
  };

  const onVisibleReviews = () => {
    if (visibleCast) {
      setVisibleCast(false);
    }
    setVisibleReviews(true);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <PageHeading text="Movie Details" />

      {movie && (
        <>
          <div className={s.wrapper}>
            <div>
              <img
                className={s.img}
                src={`${srcBaseUrl}${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className={s.wrapperText}>
              <h3>
                {movie.title}({movie.release_date.split('-')[0]})
              </h3>
              <p>User Score: {movie.vote_average * 10}%</p>

              <h3>Overview</h3>
              <p>{movie.overview}</p>

              {<h3>Genres</h3>}
              {<p>{movie.genres.map(genre => genre.name).join(' , ')}</p>}

              <button className={s.button} onClick={goBack}>
                Go Back
              </button>
            </div>
          </div>

          <hr />
          <p>Additional information</p>

          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                }}
                onClick={onVisibleCast}
              >
                Cast
              </NavLink>
            </li>

            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                }}
                onClick={onVisibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />

          <Suspense fallback={<div>Loading...</div>}>
            <Route path={`${path}/:cast`}>
              {movie && visibleCast && <Cast />}
            </Route>

            <Route path={`${path}/:reviews`}>
              {movie && visibleReviews && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
