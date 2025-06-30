import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const Starred = ({viewTrailer}) => {
    const starredMovies = useSelector((state) => state.starred.starredMovies)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to remove all starred movies?')) {
            dispatch(clearAllStarred())
        }
    }

    if (starredMovies.length === 0) {
        return (
            <div className="starred" data-testid="starred">
                <div className="text-center empty-state">
                    <i className="bi bi-star" />
                    <h3>No starred movies yet</h3>
                    <p>Movies you star will appear here</p>
                    <Link to="/" className="btn btn-primary">
                        Browse Movies
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="starred" data-testid="starred">
            <div data-testid="starred-movies" className="starred-movies">
                <header className="section-header">
                    <h2>Starred Movies</h2>
                    <span className="movie-count">{starredMovies.length} movies</span>
                </header>
                
                <div className="movies-grid">
                    {starredMovies.map((movie) => (
                        <Movie 
                            movie={movie} 
                            key={movie.id}
                            viewTrailer={viewTrailer}
                        />
                    ))}
                </div>

                <footer className="section-footer text-center">
                    <button 
                        className="btn btn-danger" 
                        onClick={handleClearAll}
                        aria-label="Remove all starred movies"
                        data-testid="clear-starred-button"
                    >
                        Remove All Starred
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default Starred
