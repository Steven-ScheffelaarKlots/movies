import React, { useEffect, useContext, useState } from 'react';
import { returnMovies, fetchCheckedOutMovies, getMovies } from '@/utils/api';
import { MovieContext } from '../context/movieContext';
import ModalComponent from '../modal/modal';
import './checkedOut.css';

interface Movie {
    id: number;
    title: string;
    quantity: number;
}

const CheckedOutComponent: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
    const { movieData, setMovieData } = useContext(MovieContext);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchCheckedOutMovies()
            .then((data) => setMovies(data as Movie[]))
            .catch(error => console.error('Error fetching movies:', error));
    }, [isOpen]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovies(prevSelectedMovies => {
            if (prevSelectedMovies.includes(movie)) {
                return prevSelectedMovies.filter(m => m.id !== movie.id);
            } else {
                return [...prevSelectedMovies, movie];
            }
        });
    };

    const handleReturnMovies = async () => {
        try {
            await returnMovies(selectedMovies);
            setMovies(prevMovies => prevMovies.filter(movie => !selectedMovies.includes(movie)));
            setSelectedMovies([]);
            const updatedMovies = await getMovies();
            setMovieData(updatedMovies);
            toggleModal();
        } catch (error) {
            console.error('Error returning movies:', error);
        }
    };

    return (
        <div className="checkedOut-container">
            <button className="submit-button" onClick={toggleModal}>Checked Out Movies</button>
            <ModalComponent show={isOpen} onClose={toggleModal}>
                <h1>Checked Out Movies</h1>
                <p>Total Checked Out Movies: {movies.length}</p>
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedMovies.includes(movie)}
                                    onChange={() => handleSelectMovie(movie)}
                                />
                                {movie.title} - Quantity: {movie.quantity}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="modal-footer">
                    <button className="submit-button"onClick={handleReturnMovies}>Return Selected Movies</button>
                    <button className="cancel-button" onClick={toggleModal}>Cancel</button>
                </div>
            </ModalComponent>
        </div>
    );
};

export default CheckedOutComponent;