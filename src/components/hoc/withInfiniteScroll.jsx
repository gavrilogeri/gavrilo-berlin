import React, { useEffect, useCallback, useState } from 'react';

export const withInfiniteScroll = (WrappedComponent) => {
  return function InfiniteScrollComponent(props) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleScroll = useCallback(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 && // Load 1000px before end
        hasMore &&
        !isLoadingMore
      ) {
        setIsLoadingMore(true);
        props.onLoadMore?.(page + 1);
        setPage(prev => prev + 1);
      }
    }, [hasMore, isLoadingMore, page, props]);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const resetPagination = useCallback(() => {
      setPage(1);
      setHasMore(true);
      setIsLoadingMore(false);
    }, []);

    return (
      <WrappedComponent
        {...props}
        page={page}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        setHasMore={setHasMore}
        setIsLoadingMore={setIsLoadingMore}
        resetPagination={resetPagination}
      />
    );
  };
}; 