import { useState, useEffect, useCallback } from 'react';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, API_KEY } from '../constants';

const useInfiniteScroll = (searchQuery = '') => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(async (pageNum, isNewSearch = false) => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const endpoint = searchQuery.trim() 
        ? `${ENDPOINT_SEARCH}&query=${encodeURIComponent(searchQuery)}&page=${pageNum}`
        : `${ENDPOINT_DISCOVER}&page=${pageNum}`;
      
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
  }, [searchQuery, loading]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMovies(page + 1);
    }
  }, [loading, hasMore, page, loadMovies]);

  const resetAndLoad = useCallback(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    loadMovies(1, true);
  }, [loadMovies]);

  // Auto-load on mount and search change
  useEffect(() => {
    resetAndLoad();
  }, [searchQuery]);

  // Simple scrol detection
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