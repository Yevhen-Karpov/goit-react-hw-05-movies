import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import NotFoundView from './pages/NotFound';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from 'components/MoviesPage/MoviesPage';
import MovieDetailsPage from 'components/MovieDetailsPage/MovieDetailsPage';

export default function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
