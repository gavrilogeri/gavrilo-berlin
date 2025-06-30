import { API_KEY, TMDB_BASE_URL } from "../constants";

const buildEndpoint = (path, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  url.searchParams.append("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  return url.toString();
};

export const getPopularMoviesEndpoint = (page = 1) => {
  return buildEndpoint("/movie/popular", { page });
};

export const getSearchMoviesEndpoint = (query, page = 1) => {
  return buildEndpoint("/search/movie", {
    query: encodeURIComponent(query),
    page,
  });
};

export const getMovieDetailsEndpoint = (movieId) => {
  return buildEndpoint(`/movie/${movieId}`, {
    append_to_response: "videos",
  });
};

export const validateApiConfig = () => {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is not configured. Please set REACT_APP_TMDB_API_KEY in your .env file"
    );
  }
};
