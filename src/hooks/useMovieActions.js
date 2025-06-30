import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';

const useMovieActions = (movie) => {
  const dispatch = useDispatch();
  const starredMovies = useSelector((state) => state.starred.starredMovies);
  const watchLaterMovies = useSelector((state) => state.watchLater.watchLaterMovies);

  // Memoized movie state checks
  const isStarred = useMemo(
    () => starredMovies.some((m) => m.id === movie.id),
    [starredMovies, movie.id]
  );

  const isInWatchLater = useMemo(
    () => watchLaterMovies.some((m) => m.id === movie.id),
    [watchLaterMovies, movie.id]
  );

  // Memoized movie data for actions
  const movieData = useMemo(
    () => ({
      id: movie.id,
      overview: movie.overview,
      release_date: movie.release_date?.substring(0, 4),
      poster_path: movie.poster_path,
      title: movie.title,
    }),
    [movie]
  );

  // Action creators
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  // Action handlers
  const toggleStar = useCallback(
    (e) => {
      e?.stopPropagation();
      if (isStarred) {
        dispatch(unstarMovie(movie));
      } else {
        dispatch(starMovie(movieData));
      }
    },
    [dispatch, isStarred, movie, movieData, starMovie, unstarMovie]
  );

  const toggleWatchLater = useCallback(
    (e) => {
      e?.stopPropagation();
      if (isInWatchLater) {
        dispatch(removeFromWatchLater(movie));
      } else {
        dispatch(addToWatchLater(movieData));
      }
    },
    [dispatch, isInWatchLater, movie, movieData, addToWatchLater, removeFromWatchLater]
  );

  return {
    isStarred,
    isInWatchLater,
    toggleStar,
    toggleWatchLater,
    movieData
  };
};

export default useMovieActions; 