import { useSelector, useDispatch } from 'react-redux'
import watchLaterSlice from '../data/watchLaterSlice'
import EmptyState from './common/EmptyState'
import MovieGrid from './common/MovieGrid'
import { confirmClearWatchLater } from '../utils/confirmationUtils'
import '../styles/starred.scss'

const WatchLater = ({ viewTrailer }) => {
  const watchLaterMovies = useSelector((state) => state.watchLater.watchLaterMovies)
  const { removeAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  const handleClearAll = () => {
    if (confirmClearWatchLater()) {
      dispatch(removeAllWatchLater())
    }
  }

  if (watchLaterMovies.length === 0) {
    return (
      <div className="watch-later" data-testid="watch-later-div">
        <EmptyState
          icon="bi-clock"
          title="Your watch later list is empty"
          description="Movies you want to watch later will appear here"
        />
      </div>
    )
  }

  return (
    <div className="watch-later" data-testid="watch-later-div">
      <MovieGrid
        movies={watchLaterMovies}
        title="Watch Later"
        viewTrailer={viewTrailer}
        onClearAll={handleClearAll}
        clearButtonText="Empty List"
        testId="watch-later-movies"
      />
    </div>
  )
}

export default WatchLater
