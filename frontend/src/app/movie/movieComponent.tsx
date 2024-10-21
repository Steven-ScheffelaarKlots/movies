import React, { useState, useContext } from "react";
import { CartContext, CartItemType } from "../context/cartContext";
import Notification from "../notification/notification";
import "./movieComponent.css";

interface MovieProps {
  movie: {
    title: string;
    genre: string;
    language: string;
    director: string;
    year_of_release: number;
    price: number;
    stock: number;
  };
}

const MovieComponent: React.FC<MovieProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleToggle = () => {
    console.log(props.movie);
    setExpanded(!expanded);
  };

  const addToCart = () => {
    const existingItemIndex = cartItems.findIndex(
      (item: CartItemType) => item.title === props.movie.title
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map(
        (item: CartItemType, index: number) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...props.movie, quantity: 1 }]);
    }
    setNotification(`${props.movie.title} has been added to the cart.`);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="movie moviebox">
      <h1>{props.movie.title}</h1>
      <p>Year of Release: {props.movie.year_of_release}</p>
      <p>Price: ${props.movie.price.toFixed(2)}</p>
      {expanded && (
        <>
          <p>Genre: {props.movie.genre}</p>
          <p>Language: {props.movie.language}</p>
          <p>Director: {props.movie.director}</p>
        </>
      )}
      <div
        className="toggle-movie"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        <span className={`toggle-icon ${expanded ? "expanded" : ""}`}>▼</span>
      </div>
      <button
        className="movie submit-button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
      >
        Add to Cart
      </button>
      <p className="movie stock-remaining">
        Stock Remaining: {props.movie.stock}
      </p>
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default MovieComponent;
