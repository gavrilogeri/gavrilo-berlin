import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
// code review: we should a .env file to for the API key. Like this we're exposing the API key to the client.
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'

const App = () => {

// Here we're getting the entire state from the store, which is unnecessary in this case and can cause performance issues/unnecessary rerenders. 
// We should select only state.movies from the store if needed (but probably not even that, as we don't have to pass it to the Movies component as a prop, we can just access it from the store in Movies.jsx). 
  const state = useSelector((state) => state)
  const { movies } = state  
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  // we should use the open state to handle the modal logic.t's unused currently.
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

  // missing state and logic for the loading state of the modal, as well as loading state for data fetching (fetchStatus from the store)
  
  // unused function
  const closeModal = () => setOpen(false)
  
  // this function is prop-drilled a couple of levels down, all the way to the Movie component.
  // and even there, it's not used. This should most likely be handled in the Movie.jsx file.
  const closeCard = () => {

  }

  // this fn is very similar to getMovies. We should extract the common logic to a separate function, or even better a custom hook
  // that way it'd be easier to maintain and reuse, and also App.js wouldn't be so cluttered by business logic and functions that should be somewhere else.
  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      // mixing template literals and + operator. We should stick to one of them (template literals best)
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
    } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    // this condition makes no sense, as the setOpen in the next line will anyways set the state to true
    // additionally, getMovie() is a async function and sets videoKey = null immediately, so !videoKey condition will always check stale state from the previous render.
    // To fix this, we should either remove the unnecesary condition. trigger the modal and add the loading logic, or create a custom hook to handle the all modal logic.
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    
    // this could lead to race condition if the user triggers multiple trailer requests quickly. We can prevent this by either aborting previous req with AbortController
    // or by tagging each request with an ID and ignoring stale responses.
    setVideoKey(null)
    // we shouldn't be mixing async/await and .then(). No error handling/try-catch.
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  // getMovies uses searchQuery and dispatch, but they're not in the dependency array.
  // we should add them to the dep array of useEffect, or memoize the getMovies function, and have it as a dependency of useEffect.
  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {/* page loads either the trailer or the message, even before the data is fetched */}
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          // inline styling, we should handle this in our stylesheet. String message is hardcoded, we could have it as a constant in a separate file.
          <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
        )}

        <Routes>
          {/* unnecesary prop drilling. We don't need movies as prop at all, we have it in the store */}
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
