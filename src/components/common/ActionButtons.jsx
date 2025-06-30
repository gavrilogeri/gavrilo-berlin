import { getMovieActionLabel } from '../../utils/movieUtils';

const ActionButtons = ({ 
  movie,
  isStarred,
  isInWatchLater,
  onToggleStar,
  onToggleWatchLater,
  onViewTrailer
}) => {
  return (
    <div className="action-buttons">
      <button
        type="button"
        className="btn-star"
        onClick={onToggleStar}
        data-testid={isStarred ? "unstar-link" : "starred-link"}
        aria-label={getMovieActionLabel('star', movie.title, isStarred)}
      >
        <i
          className={`bi ${isStarred ? "bi-star-fill" : "bi-star"}`}
          data-testid={isStarred ? "star-fill" : "star-empty"}
        />
      </button>

      <button
        type="button"
        className={`btn-watch-later ${isInWatchLater ? "active" : ""}`}
        onClick={onToggleWatchLater}
        data-testid={isInWatchLater ? "remove-watch-later" : "watch-later"}
        aria-label={getMovieActionLabel('watchLater', movie.title, isInWatchLater)}
      >
        {isInWatchLater ? (
          <i className="bi bi-check" />
        ) : (
          "Watch Later"
        )}
      </button>

      <button
        type="button"
        className="btn-trailer"
        onClick={onViewTrailer}
        aria-label={getMovieActionLabel('trailer', movie.title)}
      >
        View Trailer
      </button>
    </div>
  );
};

export default ActionButtons; 