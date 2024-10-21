import React, { useState, useContext } from 'react';
import { CartContext, CartItemType } from '../context/cartContext';
import { checkoutMovies, getMovies } from '@/utils/api';
import { MovieContext } from '../context/movieContext';
import ModalComponent from '../modal/modal';
import './cart.css';

const CartComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);
  const { movieData, setMovieData } = useContext(MovieContext);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const removeItemFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item: CartItemType) => item.id !== id);
    setCartItems(updatedCart);
  }

  const handleCheckout = async () => {
    await checkoutMovies(cartItems);
    const updatedMovies = await getMovies();
    setMovieData(updatedMovies);
    setCartItems([]);
    setIsOpen(false);
  };

  return (
    <div className="cart-container">
      <button className="cart-button" onClick={toggleModal}>Open Cart</button>
      <ModalComponent show={isOpen} onClose={toggleModal}>
        <h2 className="cart-title">Shopping Cart</h2>
        <ul className="cart-items">
          {cartItems.map(
            (item: CartItemType) => (
              console.log(item),
              (
                <li key={item.id} className="cart-item">
                  {item.title} - ${item.price.toFixed(2)}
                  {item.quantity > 1 && ` x ${item.quantity}`}
                  <button className="remove-button" onClick={() => removeItemFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              )
            )
          )}
        </ul>
        <div className="total">
          <h3>
            Total: $
            {cartItems
              .reduce(
                (total: number, item: CartItemType) =>
                  total + item.price * item.quantity,
                0
              )
              .toFixed(2)}
          </h3>
        </div>
        <div className="modal-footer">
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
          <button className="cancel-button" onClick={toggleModal}>Cancel</button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default CartComponent;