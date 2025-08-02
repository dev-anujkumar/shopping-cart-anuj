import React, { createContext, useReducer, useEffect } from 'react';
import cartReducer from './cartReducer';

export const CartContext = createContext();

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}
