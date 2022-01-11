import React, { useState, useEffect } from 'react';
import moviesApi from '../../services/moviesApi';
import Searchbar from 'components/Searchbar/Searchbar';
import MovieCard from 'components/MovieCard/MovieCard';
import s from 'components/HomePage/HomePage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const handleFormSubmit = query => {
    setQuery(query);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    moviesApi.fetchApiMoviesByQuery(query).then(setMovies);
  }, [query]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

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
