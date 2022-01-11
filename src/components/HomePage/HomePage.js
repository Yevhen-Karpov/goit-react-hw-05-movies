import { useState, useEffect } from 'react';
import moviesApi from '../../services/moviesApi';
import PageHeading from '../PageHeading/PageHeading';
import MovieCard from 'components/MovieCard/MovieCard';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesApi.fetchApiMovieTrending().then(setMovies);
  }, []);

  return (
    <>
      <PageHeading text="Trending Today" />

      {movies && (
        <ul className={s.gallery}>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </ul>
      )}
    </>
  );
}
