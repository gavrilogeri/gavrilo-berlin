export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

if (!API_KEY) {
  console.error('TMDB API key is not configured. Please set REACT_APP_TMDB_API_KEY in your .env file');
}

export const ENDPOINT = TMDB_BASE_URL;
export const ENDPOINT_DISCOVER = TMDB_BASE_URL+'/movie/popular?api_key='+API_KEY;
export const ENDPOINT_SEARCH = TMDB_BASE_URL+'/search/movie?api_key='+API_KEY;
export const ENDPOINT_MOVIE = TMDB_BASE_URL+'/movie/507086?api_key='+API_KEY+'&append_to_response=videos';
