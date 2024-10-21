import React, { useEffect, useState } from 'react';
import { returnMovies, fetchCheckedOutMovies } from '@/utils/api';
import ModalComponent from '../modal/modal';

interface Movie {
    id: number;
    title: string;
    quantity: number;
}

const CheckedOutComponent: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
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

    const handleReturnMovies = () => {
        returnMovies(selectedMovies)
            .then(() => {
                setMovies(prevMovies => prevMovies.filter(movie => !selectedMovies.includes(movie)));
                setSelectedMovies([]);
                toggleModal();
            })
            .catch(error => console.error('Error returning movies:', error));
    };

    return (
        <div>
            <ModalComponent show={isOpen} onClose={toggleModal}>
                <h1>Checked Out Movies</h1>
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
                <button onClick={handleReturnMovies}>Return Selected Movies</button>
            </ModalComponent>
            <button onClick={toggleModal}>Open Modal</button>
        
        </div>
    );
};

export default CheckedOutComponent;