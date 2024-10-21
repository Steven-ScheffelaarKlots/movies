'use client'
import MovieListComponent from "./movieList/movieListComponent";
import CartComponent from "./cart/cart";
import { getMovies } from "@/utils/api";
import { useState } from "react";
import { CartContext, CartItemsType } from "./context/cartContext";
import { useEffect } from "react";
import { MovieContext, MovieListType } from "./context/movieContext";
import CheckedOutComponent from "./checkedOut/checkedOut";

export default function Home() {
  const [movieData, setMovieData] = useState<MovieListType>([]);
  const [cartItems, setCartItems] = useState<CartItemsType>([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getMovies() as MovieListType;
      setMovieData(data);
    }
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movieData, setMovieData }}>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <div className="flex justify-between items-center">
        <h1 className="title">Movie Rental</h1>

          <div className="flex items-center">
            <CheckedOutComponent />
            <CartComponent />
          </div>
        </div>
        <MovieListComponent movies={movieData} />
      </CartContext.Provider>
    </MovieContext.Provider>
  );
}
