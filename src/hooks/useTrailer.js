import { useCallback, useState } from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import YouTubePlayer from '../components/YoutubePlayer';
import { getMovieDetailsEndpoint } from '../utils/apiUtils';
import { showTrailerError } from '../utils/confirmationUtils';
import { useModal } from './useModal';

const useTrailer = () => {
  const { isOpen: isModalOpen, modalData: videoKey, openModal, closeModal } = useModal();
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  const getTrailerKey = useCallback(async (movieId) => {
    const controller = new AbortController();
    
    try {
      setIsLoadingTrailer(true);
      const response = await fetch(
        getMovieDetailsEndpoint(movieId),
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
      showTrailerError();
    }
  }, [openModal, closeModal, getTrailerKey]);

  // Render the trailer modal component
  const TrailerModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="trailer-section">
        {isLoadingTrailer || !videoKey ? (
          <LoadingSpinner message="Loading trailer..." />
        ) : (
          <YouTubePlayer videoKey={videoKey} onClose={closeModal} />
        )}
      </div>
    );
  };

  return {
    viewTrailer,
    TrailerModal,
    isModalOpen,
    isLoadingTrailer
  };
};

export default useTrailer; 