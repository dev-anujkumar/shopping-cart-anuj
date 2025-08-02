import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider, CartContext } from '../../../context/CartContext';
import Header from '../../../components/common/Header';


const renderWithCartProvider = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};


const MockCartProvider = ({ children, cartItems = [] }) => {
  const mockDispatch = jest.fn();
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

describe('Header Component', () => {
  test('renders shopping cart title', () => {
    renderWithCartProvider(<Header />);
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });


  test('does not show cart count when cart is empty', () => {
    renderWithCartProvider(<Header />);
    const cartCount = screen.queryByText(/\d+/);
    expect(cartCount).not.toBeInTheDocument();
  });

  test('shows cart count when items are in cart', () => {

    const mockCartWithItems = [
      { id: 1, title: 'Product 1', price: 10, quantity: 2 },
      { id: 2, title: 'Product 2', price: 20, quantity: 1 }
    ];

    render(
      <MockCartProvider cartItems={mockCartWithItems}>
        <Header />
      </MockCartProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument(); // 2 + 1 = 3 total items
  });

  test('has correct header styling classes', () => {
    renderWithCartProvider(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });
});