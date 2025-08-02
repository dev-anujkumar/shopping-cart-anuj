import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CartProvider } from '../../../context/CartContext';
import ProductList from '../../../components/products/ProductList';


global.fetch = jest.fn();

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    description: 'Description 1',
    image: 'https://image1.jpg'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    description: 'Description 2',
    image: 'https://image2.jpg'
  }
];

const renderWithCartProvider = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('ProductList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state initially', () => {
    fetch.mockImplementation(() =>
      new Promise(() => {})
    );

    renderWithCartProvider(<ProductList />);
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  test('fetches and displays products', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockProducts
    });

    renderWithCartProvider(<ProductList />);

    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(2);
    });
  });


  test('renders correct number of product cards', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockProducts
    });

    renderWithCartProvider(<ProductList />);

    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(2);
    });
  });


  test('displays product prices correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockProducts
    });

    renderWithCartProvider(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('$29.99')).toBeInTheDocument();
    });
  });

  test('displays product descriptions', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockProducts
    });

    renderWithCartProvider(<ProductList />);

    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(2);
    });
  });
});