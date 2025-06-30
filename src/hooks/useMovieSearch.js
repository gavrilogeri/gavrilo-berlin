import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';
import { useDebounce } from './useDebounce';

export const useMovieSearch = () => {
  const dispatch = useDispatch();
  const { movies, fetchStatus } = useSelector(state => state.movies);
  
  const getMovies = useCallback(async () => {
    try {
      await dispatch(fetchMovies(ENDPOINT_DISCOVER)).unwrap();
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  }, [dispatch]);

  const searchMovies = useCallback(async (query) => {
    if (!query?.trim()) {
      return getMovies();
    }
    
    try {
      const searchUrl = `${ENDPOINT_SEARCH}&query=${encodeURIComponent(query.trim())}`;
      await dispatch(fetchMovies(searchUrl)).unwrap();
    } catch (error) {
      console.error('Failed to search movies:', error);
    }
  }, [dispatch, getMovies]);

  const isLoading = fetchStatus === 'loading';
  const isError = fetchStatus === 'error';
  const hasMovies = movies?.results?.length > 0;

  return {
    movies: movies?.results || [],
    isLoading,
    isError,
    hasMovies,
    getMovies,
    searchMovies
  };
}; 