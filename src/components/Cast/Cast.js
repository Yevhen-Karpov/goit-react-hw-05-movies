import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import moviesApi from '../../services/moviesApi';
import s from 'components/HomePage/HomePage.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchApiMovieCast(movieId).then(setCast);
    scroll.scrollMore(600);
  }, [movieId]);

  return (
    <>
      {cast && (
        <>
          <ul className={s.gallery}>
            {cast.map(({ id, profile_path, name, character }) => (
              <li key={id}>
                <img src={`${srcBaseUrl}${profile_path}`} alt="" />
                <h3>{name}</h3>
                <p>Charachter: {character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
