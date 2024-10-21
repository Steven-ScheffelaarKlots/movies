import axios from 'axios';
import movies from './mocks/Movies';

const API_URL = 'http://localhost:3001/api';

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}/movies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const checkoutMovies = async (movies: Array<{ id: number }>) => {
    try {
        const response = await axios.post(`${API_URL}/movies/checkout`,  movies );
        return response.data;
    } catch (error) {
        console.error('Error checking out movies:', error);
        throw error;
    }
};

export const returnMovies = async (movies: Array<{ id: number }>) => {
    try {
        const response = await axios.post(`${API_URL}/movies/return`,  movies );
        return response.data;
    } catch (error) {
        console.error('Error checking out movies:', error);
        throw error;
    }
};

export const resetMovies = async () => {
    try {
        const response = await axios.post(`${API_URL}/movies/reset`);
        return response.data;
    } catch (error) {
        console.error('Error resetting movies:', error);
        throw error;
    }
};

export const fetchCheckedOutMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}/movies/rented`);
        return response.data;
    } catch (error) {
        console.error('Error fetching checked out movies:', error);
        throw error;
    }
}

export const fetchMockMovies = () => {
    return movies;
}