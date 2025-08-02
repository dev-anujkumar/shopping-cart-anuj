import React, { useContext, useMemo } from 'react';
import { CartContext } from '../../context/CartContext';
import CartIcon from './CartIcon';
import './Header.css';

const CartCountBadge = ({ count }) => (
    <span className="cart-count">{count}</span>
);

function Header() {
    const { cart } = useContext(CartContext);
    
    const cartItemCount = useMemo(
        () => cart.reduce((total, item) => total + item.quantity, 0),
        [cart]
    );

    return (
        <header className="header">
            <h3>Shopping Cart</h3>
            <div className="cart-icon-container">
                <CartIcon />
                {cartItemCount > 0 && <CartCountBadge count={cartItemCount} />}
            </div>
        </header>
    );
}

export default Header; 