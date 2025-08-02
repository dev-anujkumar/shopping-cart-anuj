import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, CartContext } from '../../context/CartContext';


const TestComponent = () => {
  const { cart, dispatch } = React.useContext(CartContext);
  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <button
        data-testid="add-item"
        onClick={() => dispatch({
          type: 'ADD_TO_CART',
          payload: { id: 1, title: 'Test Product', price: 29.99 }
        })}
      >
        Add Item
      </button>
      <button
        data-testid="remove-item"
        onClick={() => dispatch({
          type: 'REMOVE_FROM_CART',
          payload: 1
        })}
      >
        Remove Item
      </button>
    </div>
  );
};

describe('CartContext', () => {
  test('provides initial empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
  });

  test('allows adding items to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByTestId('add-item');
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
  });

  test('allows removing items from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByTestId('add-item');
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');

    const removeButton = screen.getByTestId('remove-item');
    fireEvent.click(removeButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
  });

  test('provides dispatch function', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByTestId('add-item');
    expect(addButton).toBeInTheDocument();
    const removeButton = screen.getByTestId('remove-item');
    expect(removeButton).toBeInTheDocument();
  });

  test('maintains cart state across re-renders', () => {
    const { rerender } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByTestId('add-item');
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');

    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
  });
});