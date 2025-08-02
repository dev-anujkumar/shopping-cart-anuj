import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../../../context/CartContext';
import Cart from '../../../components/cart/Cart';

const mockCartItems = [
  { id: 1, title: 'Product 1', price: 29.99, quantity: 2 },
  { id: 2, title: 'Product 2', price: 39.99, quantity: 1 }
];


const MockCartProvider = ({ children, cartItems = [], mockDispatch = jest.fn() }) => {
  const mockContextValue = {
    cart: cartItems,
    dispatch: mockDispatch
  };

  return (
    <CartContext.Provider value={mockContextValue}>
      {children}
    </CartContext.Provider>
  );
};

const renderWithCartProvider = (cartItems = []) => {
  const mockDispatch = jest.fn();

  return {
    ...render(
      <MockCartProvider cartItems={cartItems} mockDispatch={mockDispatch}>
        <Cart />
      </MockCartProvider>
    ),
    mockDispatch
  };
};

describe('Cart Component', () => {
  test('renders cart title', () => {
    renderWithCartProvider();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('shows empty cart message when cart is empty', () => {
    renderWithCartProvider();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('displays cart items when cart has items', () => {
    renderWithCartProvider(mockCartItems);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Qty: 2')).toBeInTheDocument();
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();
  });

  test('calculates and displays total correctly', () => {
    renderWithCartProvider(mockCartItems);
    expect(screen.getByText('Total: $99.97')).toBeInTheDocument();
  });

  test('calls increment dispatch when + button is clicked', () => {
    const { mockDispatch } = renderWithCartProvider(mockCartItems);
    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'INCREMENT_QUANTITY',
      payload: 1
    });
  });

  test('calls decrement dispatch when - button is clicked', () => {
    const { mockDispatch } = renderWithCartProvider(mockCartItems);

    const decrementButtons = screen.getAllByText('-');
    fireEvent.click(decrementButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DECREMENT_QUANTITY',
      payload: 1
    });
  });

  test('calls remove dispatch when Remove button is clicked', () => {
    const { mockDispatch } = renderWithCartProvider(mockCartItems);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_CART',
      payload: 1
    });
  });

  test('renders correct number of cart items', () => {
    renderWithCartProvider(mockCartItems);

    const cartItems = screen.getAllByTestId('cart-item');
    expect(cartItems).toHaveLength(2);
  });

  test('has correct CSS classes', () => {
    renderWithCartProvider();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('displays item titles correctly', () => {
    renderWithCartProvider(mockCartItems);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('displays quantity badges correctly', () => {
    renderWithCartProvider(mockCartItems);

    expect(screen.getByText('Qty: 2')).toBeInTheDocument();
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();
  });

  test('renders cart controls for each item', () => {
    renderWithCartProvider(mockCartItems);

    const incrementButtons = screen.getAllByText('+');
    const decrementButtons = screen.getAllByText('-');
    const removeButtons = screen.getAllByText('Remove');

    expect(incrementButtons).toHaveLength(2);
    expect(decrementButtons).toHaveLength(2);
    expect(removeButtons).toHaveLength(2);
  });

});