import { useCallback } from "react";
import useMovieActions from "../hooks/useMovieActions";
import ActionButtons from "./common/ActionButtons";
import { getMoviePosterUrl, getMovieReleaseYear, getMovieActionLabel } from "../utils/movieUtils";

const Movie = ({ movie, viewTrailer }) => {
  const { isStarred, isInWatchLater, toggleStar, toggleWatchLater } = useMovieActions(movie);

  const handleViewTrailer = useCallback(() => {
    viewTrailer(movie);
  }, [viewTrailer, movie]);

  const posterUrl = getMoviePosterUrl(movie.poster_path);
  const releaseYear = getMovieReleaseYear(movie.release_date);

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-body">
          <div className="overlay" />

          <div className="info_panel">
            <div
              className="overview"
              role="region"
              aria-label="Movie overview"
            >
              {movie.overview}
            </div>

            {releaseYear && (
              <div
                className="year"
                aria-label={`Release year: ${releaseYear}`}
              >
                {releaseYear}
              </div>
            )}

            <ActionButtons
              movie={movie}
              isStarred={isStarred}
              isInWatchLater={isInWatchLater}
              onToggleStar={toggleStar}
              onToggleWatchLater={toggleWatchLater}
              onViewTrailer={handleViewTrailer}
            />
          </div>

          <img
            className="center-block"
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
            loading="lazy"
          />
        </div>

        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
      </div>
    </div>
  );
};

export default Movie;
