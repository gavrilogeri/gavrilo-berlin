import Movie from '../Movie';

const MovieGrid = ({ 
  movies, 
  title, 
  viewTrailer,
  onClearAll,
  clearButtonText = "Empty List",
  testId 
}) => {
  return (
    <div data-testid={testId} className={testId}>
      <header className="section-header">
        <h2>{title}</h2>
        <span className="movie-count">{movies.length} movies</span>
      </header>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <Movie 
            movie={movie} 
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
      </div>

      {onClearAll && (
        <footer className="section-footer">
          <button 
            className="btn-warning" 
            onClick={onClearAll}
            aria-label={`${clearButtonText.toLowerCase()} list`}
            data-testid={`clear-${testId.replace('-', '-')}-button`}
          >
            {clearButtonText}
          </button>
        </footer>
      )}
    </div>
  );
};

export default MovieGrid; 