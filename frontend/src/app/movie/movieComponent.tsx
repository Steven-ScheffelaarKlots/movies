"use client";
import React, { useState, useContext } from "react";
import { CartContext, CartItemType } from "../context/cartContext";

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
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleToggle = () => {
    console.log(props.movie);
    setExpanded(!expanded);
  };

const addToCart = () => {
    const existingItemIndex = cartItems.findIndex((item: CartItemType) => item.title === props.movie.title);
    if (existingItemIndex !== -1) {
        const updatedCartItems = cartItems.map((item: CartItemType, index: number) => 
            index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
    } else {
        setCartItems([...cartItems, { ...props.movie, quantity: 1 }]);
    }
};

  return (
    <div
      onClick={handleToggle}
      style={{
        cursor: "pointer",
        backgroundColor: "white",
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "16px",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <h1 style={{ fontWeight: "bold" }}>{props.movie.title}</h1>
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
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
        style={{
          position: "absolute",
          right: "16px",
          top: "16px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
      <p
        style={{
          position: "absolute",
          right: "16px",
          top: "56px",
          color: "gray",
        }}
      >
        Stock Remaining: {props.movie.stock}
      </p>
    </div>
  );
};

export default MovieComponent;
