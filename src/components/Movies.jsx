import { useSelector } from 'react-redux';
import Movie from './Movie';
import { LoadingSpinner } from './common/LoadingSpinner';
import '../styles/movies.scss';

const Movies = ({ viewTrailer, isLoading }) => {
  const { movies, fetchStatus } = useSelector((state) => state.movies);
  const moviesList = movies?.results || [];
  
  if (isLoading || fetchStatus === 'loading') {
    return <LoadingSpinner message="Loading movies..." />;
  }

export default Movies
  if (fetchStatus === 'error') {
    return (
      <div className="error-state">
        <h3>Failed to load movies</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (moviesList.length === 0) {
    return (
      <div className="no-movies">
        <h3>No movies found</h3>
        <p>Try searching for a different movie.</p>
      </div>
    );
  }

  return (
    <div data-testid="movies" className="movies-grid">
      {moviesList.map((movie) => (
        <Movie 
          movie={movie} 
          key={movie.id}
          viewTrailer={viewTrailer}
        />
      ))}
    </div>
  );
};

export default Movies;
