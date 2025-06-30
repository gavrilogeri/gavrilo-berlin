import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const WatchLater = ({viewTrailer}) => {
  const watchLaterMovies = useSelector((state) => state.watchLater.watchLaterMovies)
  const { removeAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to empty your watch later list?')) {
      dispatch(removeAllWatchLater())
    }
  }

  if (watchLaterMovies.length === 0) {
    return (
      <div className="watch-later" data-testid="watch-later-div">
        <div className="empty-state">
          <i className="bi bi-clock" />
          <h3>Your watch later list is empty</h3>
          <p>Movies you want to watch later will appear here</p>
          <Link to="/" className="btn-primary">
            Browse Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="watch-later" data-testid="watch-later-div">
      <div data-testid="watch-later-movies" className="watch-later-movies">
        <header className="section-header">
          <h2>Watch Later</h2>
          <span className="movie-count">{watchLaterMovies.length} movies</span>
        </header>
        
        <div className="movies-grid">
          {watchLaterMovies.map((movie) => (
            <Movie 
              movie={movie} 
              key={movie.id}
              viewTrailer={viewTrailer}
            />
          ))}
        </div>

        <footer className="section-footer">
          <button 
            className="btn-warning" 
            onClick={handleClearAll}
            aria-label="Empty watch later list"
            data-testid="clear-watch-later-button"
          >
            Empty List
          </button>
        </footer>
      </div>
    </div>
  )
}

export default WatchLater
