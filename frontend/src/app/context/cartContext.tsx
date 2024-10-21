'use client'
import React, { createContext } from "react";

export type CartItemType = {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

type CartContextType = {
    cartItems: CartItemsType;
    setCartItems: React.Dispatch<React.SetStateAction<CartItemsType>>;
}

export type CartItemsType = CartItemType[];
export const CartContext = createContext<null | CartContextType>(null as unknown as CartContextType);

