import { useState, useEffect, useCallback, useRef } from 'react';
import { getPopularMoviesEndpoint, getSearchMoviesEndpoint } from '../utils/apiUtils';

const useInfiniteScroll = (searchQuery = '') => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // we;re using ref to avoid stale closure issues
  const loadingRef = useRef(false);
  loadingRef.current = loading;

  const loadMovies = useCallback(async (pageNum, isNewSearch = false) => {
    if (loadingRef.current) return;
    
    setLoading(true);
    
    try {
      const endpoint = searchQuery.trim() 
        ? getSearchMoviesEndpoint(searchQuery, pageNum)
        : getPopularMoviesEndpoint(pageNum);
      
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.results) {
        if (isNewSearch || pageNum === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        
        setHasMore(pageNum < data.total_pages);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]); 

  const loadMore = useCallback(() => {
    if (!loadingRef.current && hasMore) {
      loadMovies(page + 1);
    }
  }, [hasMore, page, loadMovies]);

  // Auto-load on mount and search change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    loadMovies(1, true);
  }, [searchQuery, loadMovies]); 

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    const throttleTimeout = 200;
    let timeoutId;
    
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, throttleTimeout);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [loadMore]);

  return {
    movies,
    loading,
    hasMore
  };
};

export default useInfiniteScroll; 