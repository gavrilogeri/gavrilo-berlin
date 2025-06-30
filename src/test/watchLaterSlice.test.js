import watchLaterSlice from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

describe('watchLaterSlice test', () => {

    const initialState = { watchLaterMovies: [] }

    it('should set initial state', () => {
        const action = { type: '' }
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result).toEqual({ watchLaterMovies: []})
      })    

      it('should add movie to watch later', () => {
        const initialStateEmpty = { ...initialState, watchLaterMovies: [] }
        const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialStateEmpty, action)
        
        expect(result.watchLaterMovies).toHaveLength(1)
        expect(result.watchLaterMovies[0]).toEqual(moviesMock[0])
      })

      it('should remove movie from watch later', () => {
        const initialStateWithMovies = { ...initialState, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeFromWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialStateWithMovies, action)
        
        expect(result.watchLaterMovies).toHaveLength(1)
        expect(result.watchLaterMovies[0]).toEqual(moviesMock[1])
      })

      it('should remove all movies', () => {
        const initialStateWithMovies = { ...initialState, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeAllWatchLater()
        const result = watchLaterSlice.reducer(initialStateWithMovies, action)
        
        expect(result.watchLaterMovies).toHaveLength(0)
        expect(result.watchLaterMovies).toEqual([])
      })

      it('should handle removing non-existent movie gracefully', () => {
        const initialStateWithMovies = { ...initialState, watchLaterMovies: [moviesMock[0]] }
        const nonExistentMovie = { id: 999, title: 'Non-existent' }
        const action = watchLaterSlice.actions.removeFromWatchLater(nonExistentMovie)
        const result = watchLaterSlice.reducer(initialStateWithMovies, action)
        
        expect(result.watchLaterMovies).toHaveLength(1)
        expect(result.watchLaterMovies[0]).toEqual(moviesMock[0])
      })
})