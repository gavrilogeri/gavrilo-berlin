import { useState, useCallback } from 'react';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import { ENDPOINT, API_KEY } from './constants';
import { useModal } from './hooks/useModal';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import ErrorBoundary from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import YouTubePlayer from './components/YoutubePlayer';
import './app.scss';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const navigate = useNavigate();
  
  const { movies, loading, hasMore } = useInfiniteScroll(searchQuery);
  const { isOpen: isModalOpen, modalData: videoKey, openModal, closeModal } = useModal();
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  const searchMovies = useCallback((query) => {
    navigate('/');
    
    if (query?.trim()) {
      setSearchParams(createSearchParams({ search: query.trim() }));
    } else {
      setSearchParams();
    }
  }, [navigate, setSearchParams]);

  const getTrailerKey = useCallback(async (movieId) => {
    const controller = new AbortController();
    
    try {
      setIsLoadingTrailer(true);
      const response = await fetch(
        `${ENDPOINT}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`,
        { signal: controller.signal }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const videoData = await response.json();
      
      if (videoData.videos?.results?.length) {
        const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer');
        return trailer ? trailer.key : videoData.videos.results[0].key;
      }
      
      return null;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Failed to fetch trailer:', error);
      }
      return null;
    } finally {
      setIsLoadingTrailer(false);
    }
  }, []);

  const viewTrailer = useCallback(async (movie) => {
    if (!movie?.id) return;
    
    openModal(null); // Open modal immediately with loading state
    const trailerKey = await getTrailerKey(movie.id);
    
    if (trailerKey) {
      openModal(trailerKey);
    } else {
      closeModal();
      alert('No trailer available for this movie');
    }
  }, [openModal, closeModal, getTrailerKey]);



  return (
    <ErrorBoundary>
      <div className="App">
        <Header searchMovies={searchMovies} />

        <div className="container">
          {isModalOpen && (
            <div className="trailer-section">
              {isLoadingTrailer || !videoKey ? (
                <LoadingSpinner message="Loading trailer..." />
              ) : (
                <YouTubePlayer videoKey={videoKey} onClose={closeModal} />
              )}
            </div>
          )}

          <Routes>
            <Route 
              path="/" 
              element={
                <Movies
                  movies={movies}
                  loading={loading}
                  hasMore={hasMore}
                  viewTrailer={viewTrailer}
                />
              } 
            />
            <Route 
              path="/starred" 
              element={<Starred viewTrailer={viewTrailer} />} 
            />
            <Route 
              path="/watch-later" 
              element={<WatchLater viewTrailer={viewTrailer} />} 
            />
            <Route 
              path="*" 
              element={
                <div className="not-found">
                  <h1>Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              } 
            />
          </Routes>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App; 