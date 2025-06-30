import { TMDB_IMAGE_BASE_URL } from '../constants';
import placeholder from '../assets/not-found-500X750.jpeg';


export const getMoviePosterUrl = (posterPath) => {
  return posterPath 
    ? `${TMDB_IMAGE_BASE_URL}${posterPath}`
    : placeholder;
};


export const getMovieReleaseYear = (releaseDate) => {
  return releaseDate?.substring(0, 4) || null;
};


export const formatMovieForAction = (movie) => ({
  id: movie.id,
  overview: movie.overview,
  release_date: movie.release_date?.substring(0, 4),
  poster_path: movie.poster_path,
  title: movie.title,
});


export const getMovieActionLabel = (action, movieTitle, isActive) => {
  const actions = {
    star: isActive ? 'Remove from starred' : 'Add to starred',
    watchLater: isActive ? 'Remove from watch later' : 'Add to watch later',
    trailer: `View trailer for ${movieTitle}`,
    close: `Close details for ${movieTitle}`,
    view: `View details for ${movieTitle}`
  };
  
  return actions[action] || '';
}; 