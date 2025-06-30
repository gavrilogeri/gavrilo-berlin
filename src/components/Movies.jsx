import React from 'react';
import Movie from './Movie';
import { LoadingSpinner } from './common/LoadingSpinner';
import '../styles/movies.scss';

const Movies = ({ movies, loading, hasMore, viewTrailer }) => {
  if (loading && movies.length === 0) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <h3>No movies found</h3>
        <p>Try searching for a different movie.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">POPULAR MOVIES</h1>
      <div data-testid="movies" className="movies-grid">
        {movies.map((movie) => (
          <Movie 
            movie={movie} 
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
      </div>
      
      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <LoadingSpinner message="Loading more movies..." />
        </div>
      )}
      
      {!hasMore && movies.length > 0 && (
        <div style={{ padding: '20px', textAlign: 'center', color: '#ccc' }}>
          <p>You've reached the end of the list!</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
