import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey, onClose }) => {
  if (!videoKey) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="youtube-player-modal" onClick={handleBackdropClick}>
      <div className="youtube-player-container">
        {onClose && (
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close video player"
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