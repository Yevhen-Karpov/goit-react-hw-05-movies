import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '3b0a0f3678b03bfe7113d836939cb420';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

async function fetchApiMovieTrending() {
  try {
    const config = {
      url: `trending/movie/week`,
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchApiMoviesByQuery(query) {
  try {
    const config = {
      url: `search/movie`,
      params: {
        query,
      },
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchApiMovieDetails(movieId) {
  try {
    const config = {
      url: `movie/${movieId}`,
    };

    const { data } = await axios(config, movieId);
    return data;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchApiMovieCast(movieId) {
  try {
    const config = {
      url: `movie/${movieId}/credits`,
    };

    const { data } = await axios(config, movieId);
    return data.cast;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchApiMovieReviews(movieId) {
  try {
    const config = {
      url: `movie/${movieId}/reviews`,
    };

    const { data } = await axios(config, movieId);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

const moviesApi = {
  fetchApiMovieTrending,
  fetchApiMoviesByQuery,
  fetchApiMovieDetails,
  fetchApiMovieCast,
  fetchApiMovieReviews,
};

export default moviesApi;
