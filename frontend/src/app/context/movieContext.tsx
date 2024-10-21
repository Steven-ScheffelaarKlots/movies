'use client'
import React, { createContext } from "react";

export type MovieType = {
    title: string,
    genre: string,
    language: string,
    director: string,
    year_of_release: number,
    price: number,
    stock: number
}

type MovieContextType = {
    movieData: MovieListType;
    setMovieData: React.Dispatch<React.SetStateAction<MovieListType>>;
}

export type MovieListType = MovieType[];
export const MovieContext = createContext<null | MovieContextType>(null as unknown as MovieContextType);