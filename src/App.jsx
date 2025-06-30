import { useCallback } from 'react';
import { Route, Routes, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import './app.scss';
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useTrailer from './hooks/useTrailer';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const navigate = useNavigate();
  
  const { movies, loading, hasMore } = useInfiniteScroll(searchQuery);
  const { viewTrailer, TrailerModal } = useTrailer();

  const searchMovies = useCallback((query) => {
    navigate('/');
    
    if (query?.trim()) {
      setSearchParams(createSearchParams({ search: query.trim() }));
    } else {
      setSearchParams();
    }
  }, [navigate, setSearchParams]);

  return (
    <ErrorBoundary>
      <div className="App">
        <Header searchMovies={searchMovies} />

        <div className="container">
          <TrailerModal />

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