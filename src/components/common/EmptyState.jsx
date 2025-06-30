import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  buttonText = "Browse Movies",
  buttonLink = "/" 
}) => {
  return (
    <div className="empty-state">
      <i className={`bi ${icon}`} />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={buttonLink} className="btn-primary">
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState; 