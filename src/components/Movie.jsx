import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import { TMDB_IMAGE_BASE_URL } from "../constants";
import placeholder from "../assets/not-found-500X750.jpeg";

const Movie = ({ movie, viewTrailer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const starredMovies = useSelector((state) => state.starred.starredMovies);
  const watchLaterMovies = useSelector(
    (state) => state.watchLater.watchLaterMovies
  );

  // We'll memoize this to prevent unnecessary calculations
  const isStarred = useMemo(
    () => starredMovies.some((m) => m.id === movie.id),
    [starredMovies, movie.id]
  );

  const isInWatchLater = useMemo(
    () => watchLaterMovies.some((m) => m.id === movie.id),
    [watchLaterMovies, movie.id]
  );

  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  //   Memoized movie data
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

  const handleCardClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    setIsExpanded(false);
  }, []);

  const handleStarToggle = useCallback(
    (e) => {
      e.stopPropagation();
      if (isStarred) {
        dispatch(unstarMovie(movie));
      } else {
        dispatch(starMovie(movieData));
      }
    },
    [dispatch, isStarred, movie, movieData, starMovie, unstarMovie]
  );

  const handleWatchLaterToggle = useCallback(
    (e) => {
      e.stopPropagation();
      if (isInWatchLater) {
        dispatch(removeFromWatchLater(movie));
      } else {
        dispatch(addToWatchLater(movieData));
      }
    },
    [
      dispatch,
      isInWatchLater,
      movie,
      movieData,
      addToWatchLater,
      removeFromWatchLater,
    ]
  );

  const handleViewTrailer = useCallback(
    (e) => {
      e.stopPropagation();
      viewTrailer(movie);
    },
    [viewTrailer, movie]
  );

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : placeholder;

  const releaseYear = movie.release_date?.substring(0, 4);

  return (
    <div className="wrapper">
      <div
        className={`card ${isExpanded ? "opened" : ""}`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View details for ${movie.title}`}
      >
        <div className="card-body">
          <div className="overlay" />

          {isExpanded && (
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

              <div className="action-buttons">
                <button
                  type="button"
                  className="btn-star"
                  onClick={handleStarToggle}
                  data-testid={isStarred ? "unstar-link" : "starred-link"}
                  aria-label={
                    isStarred ? "Remove from starred" : "Add to starred"
                  }
                >
                  <i
                    className={`bi ${isStarred ? "bi-star-fill" : "bi-star"}`}
                    data-testid={isStarred ? "star-fill" : "star-empty"}
                  />
                </button>

                <button
                  type="button"
                  className={`btn-watch-later ${
                    isInWatchLater ? "active" : ""
                  }`}
                  onClick={handleWatchLaterToggle}
                  data-testid={
                    isInWatchLater ? "remove-watch-later" : "watch-later"
                  }
                  aria-label={
                    isInWatchLater
                      ? "Remove from watch later"
                      : "Add to watch later"
                  }
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
                  onClick={handleViewTrailer}
                  aria-label={`View trailer for ${movie.title}`}
                >
                  View Trailer
                </button>
              </div>
            </div>
          )}

          <img
            className="center-block"
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
            loading="lazy"
          />
        </div>

        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>

        {isExpanded && (
          <button
            type="button"
            className="close"
            onClick={handleClose}
            aria-label={`Close details for ${movie.title}`}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Movie;
