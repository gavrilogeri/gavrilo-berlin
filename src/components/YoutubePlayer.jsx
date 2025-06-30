import { useEffect } from 'react';
import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey, onClose }) => {
  useEffect(() => {
    if (!videoKey) return; 
    
    // Handle escape key to close the modall
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // this will prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // this will restore scrolling
    };
  }, [videoKey, onClose]);

  if (!videoKey) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="youtube-player-modal" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div className="youtube-player-container">
        {onClose && (
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close video player"
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
        
        <ReactPlayer 
          className="video-player" 
          url={`https://www.youtube.com/watch?v=${videoKey}`} 
          controls={true}
          playing={true}
          width="100%"
          height="100%"
          data-testid="youtube-player"
        />
      </div>
    </div>
  );
};

export default YoutubePlayer;