import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {
    // Tests are very weak. They don't check what matters. We create a new state for each test, but we never check it.
    // Just checking the payload exists and is truthy is not enough. We need more thorough tests that check the reducer logic, state changes
    it('should set loading true while action is pending', () => {
        const action = {type: fetchMovies.pending};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action).toEqual({type: fetchMovies.pending})
     })

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled, 
            payload: moviesMock
        };
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action.payload).toBeTruthy()
    })

    it('should set error when action is rejected', () => {
        const action = {type: fetchMovies.rejected};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action).toEqual({type: fetchMovies.rejected})
     })

})