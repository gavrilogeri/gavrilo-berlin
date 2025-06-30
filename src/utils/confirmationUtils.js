export const confirmClearStarred = () => {
  return window.confirm('Are you sure you want to remove all starred movies?');
};


export const confirmClearWatchLater = () => {
  return window.confirm('Are you sure you want to empty your watch later list?');
};


export const confirmAction = (message) => {
  return window.confirm(message);
};


export const showTrailerError = () => {
  alert('No trailer available for this movie');
}; 