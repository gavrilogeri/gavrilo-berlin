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

  // Trigger search when debounced term changes
  useEffect(() => {
    searchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchMovies]);

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleClearSearch}>
        <i className="bi bi-film" />
      </Link>

      <nav>
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
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <form onSubmit={handleSubmit} className="input-group rounded">
        <input 
          type="search" 
          data-testid="search-movies"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control rounded" 
          placeholder="Search movies..." 
          aria-label="Search movies" 
          aria-describedby="search-addon" 
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={handleClearSearch}
            className="btn btn-outline-secondary clear-search"
            aria-label="Clear search"
          >
            <i className="bi bi-x-circle" />
          </button>
        )}
      </form>
    </header>
  )
}

export default Header
