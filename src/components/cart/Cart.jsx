import { useContext, useMemo, useCallback } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
    <div className="cart-item" data-testid="cart-item">
        <div className="cart-item-image">
            <img src={item.image} alt={item.title} />
        </div>
        <div className="cart-item-content">
            <div className="item-title">{item.title}</div>
            <div className="item-quantity">Qty: {item.quantity}</div>
            <div className="cart-controls">
                <button onClick={() => onIncrement(item.id)}>+</button>
                <button onClick={() => onDecrement(item.id)}>-</button>
                <button 
                    className="remove-btn" 
                    onClick={() => onRemove(item.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
);

const EmptyCart = () => (
    <p>Your cart is empty</p>
);

const CartTotal = ({ total }) => (
    <div className="cart-total">Total: ${total}</div>
);

function Cart() {
    const { cart, dispatch } = useContext(CartContext);

    const total = useMemo(
        () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
        [cart]
    );

    const handleIncrement = useCallback((itemId) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
    }, [dispatch]);

    const handleDecrement = useCallback((itemId) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
    }, [dispatch]);

    const handleRemove = useCallback((itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    }, [dispatch]);

    if (cart.length === 0) {
        return (
            <div className="cart">
                <h3>Cart</h3>
                <EmptyCart />
            </div>
        );
    }

    return (
        <div className="cart">
            <h3>Cart</h3>
            <div className="cart-items">
                {cart.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
            <CartTotal total={total} />
        </div>
    );
}

export default Cart;
