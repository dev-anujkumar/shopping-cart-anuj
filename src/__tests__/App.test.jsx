import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


jest.mock('../components/common/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('../components/products/ProductList', () => {
  return function MockProductList() {
    return <div data-testid="product-list">ProductList</div>;
  };
});

jest.mock('../components/cart/Cart', () => {
  return function MockCart() {
    return <div data-testid="cart">Cart</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('renders all main components', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });

  test('wraps components in CartProvider', () => {
    render(<App />);


    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    render(<App />);

    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();

    const contentWrapper = screen.getByTestId('content-wrapper');
    expect(contentWrapper).toBeInTheDocument();
  });

  test('renders header at the top', () => {
    render(<App />);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('renders product list and cart in content wrapper', () => {
    render(<App />);

    const productList = screen.getByTestId('product-list');
    const cart = screen.getByTestId('cart');

    expect(productList).toBeInTheDocument();
    expect(cart).toBeInTheDocument();
  });
});