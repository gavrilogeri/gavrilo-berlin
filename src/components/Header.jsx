import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDebounce } from '../hooks/useDebounce';

import '../styles/header.scss'

const Header = ({ searchMovies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { starredMovies } = useSelector((state) => state.starred)

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    searchMovies('');
  }, [searchMovies]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  }, [searchMovies, searchTerm]);

  // Trigger search when debounced search term gets changed
  useEffect(() => {
    searchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchMovies]);

  return (
    <header>
      <div className="logo">
        <Link to="/" data-testid="home" onClick={handleClearSearch}>
          <i className="bi bi-film" />
          <span className="logo-text">MOVIELAND</span>
        </Link>
      </div>

      <div className="header-right">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-container">
            <input 
              type="text" 
              data-testid="search-movies"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input" 
              placeholder="Search movies..." 
              aria-label="Search movies" 
            />
            {searchTerm && (
              <button 
                type="button"
                className="btn-clear"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <i className="bi bi-x-circle" />
              </button>
            )}
          </div>
        </form>

        <nav>
          <div className="nav-item">
            <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
              {starredMovies.length > 0 ? (
                <>
                <i className="bi bi-star-fill bi-star-fill-white" />
                <sup className="star-number">{starredMovies.length}</sup>
                </>
              ) : (
                <i className="bi bi-star" />
              )}
            </NavLink>
          </div>
          <NavLink to="/watch-later" className="nav-fav">
            watch later
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
