import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, CartContext } from '../../../context/CartContext';
import ProductCard from '../../../components/products/ProductCard';


const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'This is a test product description',
  image: 'https://test-image.jpg'
};

const renderWithCartProvider = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};


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

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  test('renders product image with correct attributes', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://test-image.jpg');
  });

  test('shows "Add to Cart" button when product is not in cart', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  test('shows "Added to Cart" button when product is in cart', () => {

    const mockCartWithProduct = [
      { id: 1, title: 'Test Product', price: 29.99, quantity: 1 }
    ];

    render(
      <MockCartProvider cartItems={mockCartWithProduct}>
        <ProductCard product={mockProduct} />
      </MockCartProvider>
    );
    
    expect(screen.getByText('Added to Cart')).toBeInTheDocument();
  });

  test('button is disabled when product is in cart', () => {
    const mockCartWithProduct = [
      { id: 1, title: 'Test Product', price: 29.99, quantity: 1 }
    ];

    render(
      <MockCartProvider cartItems={mockCartWithProduct}>
        <ProductCard product={mockProduct} />
      </MockCartProvider>
    );
    
    const button = screen.getByText('Added to Cart');
    expect(button).toBeDisabled();
  });

  test('calls dispatch with ADD_TO_CART when Add to Cart is clicked', () => {
    const mockDispatch = jest.fn();

    render(
      <MockCartProvider cartItems={[]} mockDispatch={mockDispatch}>
        <ProductCard product={mockProduct} />
      </MockCartProvider>
    );
    
    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: mockProduct
    });
  });

  test('has correct CSS classes', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const productCard = screen.getByTestId('product-card');
    expect(productCard).toHaveClass('product-card');
  });

  test('renders price and button in price-button-row', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
}); 