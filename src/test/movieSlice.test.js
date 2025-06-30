import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {
    const initialState = { 
        movies: { results: [] }, 
        fetchStatus: '' 
    };

    it('should set loading state when action is pending', () => {
        const action = { type: fetchMovies.pending };
        const newState = moviesSlice.reducer(initialState, action);
        
        expect(newState.fetchStatus).toBe('loading');
        expect(newState.movies).toEqual({ results: [] });
    });

    it('should set success state and movies when action is fulfilled', () => {
        const mockPayload = { results: moviesMock };
        const action = {
            type: fetchMovies.fulfilled, 
            payload: mockPayload
        };
        
        const newState = moviesSlice.reducer(initialState, action);
        
        expect(newState.fetchStatus).toBe('success');
        expect(newState.movies).toEqual(mockPayload);
        expect(newState.movies.results).toHaveLength(2);
        expect(newState.movies.results[0].title).toBe('Inception');
    });

    it('should set error state when action is rejected', () => {
        const action = { type: fetchMovies.rejected };
        const newState = moviesSlice.reducer(initialState, action);
        
        expect(newState.fetchStatus).toBe('error');
        expect(newState.movies).toEqual({ results: [] });
    });

    it('should handle complete state lifecycle', () => {
        let state = initialState;
        
        // Start loading
        state = moviesSlice.reducer(state, { type: fetchMovies.pending });
        expect(state.fetchStatus).toBe('loading');
        
        // Successfully load data
        const mockPayload = { results: moviesMock };
        state = moviesSlice.reducer(state, {
            type: fetchMovies.fulfilled, 
            payload: mockPayload
        });
        expect(state.fetchStatus).toBe('success');
        expect(state.movies.results).toHaveLength(2);
        
        // Handle error
        state = moviesSlice.reducer(state, { type: fetchMovies.rejected });
        expect(state.fetchStatus).toBe('error');
        expect(state.movies.results).toHaveLength(2); // Movies should persist
    });

    it('should handle unknown action types', () => {
        const unknownAction = { type: 'unknown/action' };
        const newState = moviesSlice.reducer(initialState, unknownAction);
        
        expect(newState).toEqual(initialState);
    });
});