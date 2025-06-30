import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const WatchLater = ({viewTrailer}) => {

    // accessing the entire state from the store. We should select only the watchLaterMovies from the state.watchLater.
    // we're also not handling the loading state or error state
    const state = useSelector((state) => state)
    const { watchLater } = state
    // fix the typo here, we should rename it to removeAllWatchLater
    const { remveAllWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()

  return (
    // using the same class name for the component as for the Starred component. It's confusing.
    // If we want to have the same styles for both, we should name it accordingly.
    <div className="starred" data-testid="watch-later-div">
      {/* formatting could be better for readability*/}
      {watchLater.watchLaterMovies.length > 0 && (<div data-testid="watch-later-movies" className="starred-movies">
        <h6 className="header">Watch Later List</h6>
        <div className="row">
        {watchLater.watchLaterMovies.map((movie) => (
        // no closeCard prop. It's required in Movie.jsx
          <Movie 
            movie={movie} 
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
        </div>

        <footer className="text-center">
          {/* it's a destructive action, we could have a confirmation modal */}
          <button className="btn btn-primary" onClick={() => dispatch(remveAllWatchLater())}>Empty list</button>
        </footer>
      </div>)}

      {watchLater.watchLaterMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-heart" />
        <p>You have no movies saved to watch later.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default WatchLater
