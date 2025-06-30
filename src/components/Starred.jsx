import { useSelector, useDispatch } from 'react-redux'
import starredSlice from '../data/starredSlice'
import EmptyState from './common/EmptyState'
import MovieGrid from './common/MovieGrid'
import { confirmClearStarred } from '../utils/confirmationUtils'
import '../styles/starred.scss'

const Starred = ({ viewTrailer }) => {
    const starredMovies = useSelector((state) => state.starred.starredMovies)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

    const handleClearAll = () => {
        if (confirmClearStarred()) {
            dispatch(clearAllStarred())
        }
    }

    if (starredMovies.length === 0) {
        return (
            <div className="starred" data-testid="starred-div">
                <EmptyState
                    icon="bi-star"
                    title="Your starred list is empty"
                    description="Movies you star will appear here"
                />
            </div>
        )
    }

    return (
        <div className="starred" data-testid="starred-div">
            <MovieGrid
                movies={starredMovies}
                title="Starred Movies"
                viewTrailer={viewTrailer}
                onClearAll={handleClearAll}
                clearButtonText="Empty List"
                testId="starred-movies"
            />
        </div>
    )
}

export default Starred
