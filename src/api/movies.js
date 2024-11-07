import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTdlNDZhMmVkODAyNmYxNjgwYTNjNmZlYWYzYWZmOSIsIm5iZiI6MTczMDk4MzkwNC4wODgxNTI0LCJzdWIiOiI2NzJjYjY5NjQyYmVjNDk4Nzc4MGE1NjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.auYEGCxuG2DhtehB0AV1l-Fhecuf0m2Qpi334KYkeeQ';

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    language: 'en-US',
  },
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

export const getTrendingMovies = async () => {
  const { data } = await moviesInstance.get('/trending/movie/day');
  return data;
}

export const getMovieById = async (movieId) => {
  const { data } = await moviesInstance.get(`/movie/${movieId}`);
  return data;
}

export const getMovieCast = async (movieId) => {
  const { data } = await moviesInstance.get(`/movie/${movieId}/credits`);
  return data;
}

export const getMovieReviews = async (movieId, page) => {
  const { data } = await moviesInstance.get(`/movie/${movieId}/reviews`, {
    params: { page }
  });
  return data;
}

export const searchMovie = async (query) => {
  const { data } = await moviesInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
    }
  });
  return data;
}