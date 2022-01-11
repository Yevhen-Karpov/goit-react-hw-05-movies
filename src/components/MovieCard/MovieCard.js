import React from 'react';
import { Link } from 'react-router-dom';
import s from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <li key={movie.id}>
      <img src={`${srcBaseUrl}${movie.poster_path}`} alt={movie.title}></img>
      <Link className={s.text} to={`movies/${movie.id}`}>
        <p>{movie.title}</p>
      </Link>
    </li>
  );
}
