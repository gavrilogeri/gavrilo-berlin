import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from './Movie'
import '../styles/starred.scss'


// viewTrailer is a prop passed from App.js to Movies.jsx, Starred.jsx and WatchLater.jsx. 
// It could make sense to have it as a custom hook or HOC
const Starred = ({viewTrailer}) => {
    // Again selecting the entire state from the store. We should select only the starredMovies from the state.starred.
    // otherwise, component rerenders when any state changes (even unrelated, like movies, watchLater, etc.)
    const state = useSelector((state) => state)
    const { starred } = state
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="starred">
      {/* We can combine these two conditional renders into one and use the ternary operator*/}
      {starred.starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="row">
        {starred.starredMovies.map((movie) => (
          // Movie component expects closeCard as a prop, but it's not passed here.
          // We should either pass it here, or remove it as a req from the Movie component.
          <Movie 
            movie={movie} 
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
        </div>

        <footer className="text-center">
        {/* we can have aria-label for the button, to make it more accessible or data-testid for testing */}
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
        </footer>
      </div>)}

      {starred.starredMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
