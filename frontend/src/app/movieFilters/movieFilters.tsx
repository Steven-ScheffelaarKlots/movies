import React, { useState } from 'react';
import MovieListComponent from '../movieList/movieListComponent';

interface Movie {
    title: string;
    genre: string;
    year: string;
}

interface MovieFiltersProps {
    movies: Movie[];
}

const MovieFilters: React.FC<MovieFiltersProps> = ({ movies }) => {
    const [genre, setGenre] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    const handleFilter = () => {
        const filtered = movies.filter(movie => 
            (genre ? movie.genre === genre : true) &&
            (year ? movie.year === year : true)
        );

        setFilteredMovies(filtered);
    };

    return (
        <div>
            <h2>Filter Movies</h2>
            <div>
                <label>
                    Genre:
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Year:
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                </label>
            </div>
            <button onClick={handleFilter}>Filter</button>
            <MovieListComponent movies={filteredMovies} />
        </div>
    );
};

export default MovieFilters;