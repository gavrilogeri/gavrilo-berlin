import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard }) => {
    // moviesSlice has loading and error states but we're not using them here.
    return (
        <div data-testid="movies">
            {movies.movies.results?.map((movie) => {
                // nit: explicit return is not really needed in this case, but it's not a big deal.
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
