import React from 'react';
import MovieComponent from '../movie/movieComponent';

interface Movie {
    title: string,
    genre: string,
    language: string,
    director: string,
    year_of_release: number,
    price: number,
    stock: number
}

interface MovieListComponentProps {
    movies: Movie[];
}

const MovieListComponent: React.FC<MovieListComponentProps> = (props) => {
    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {props.movies.map((movie, index) => (
                    <li key={index}>
                        <MovieComponent movie={ movie } />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieListComponent;