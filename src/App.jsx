import ProductList from './components/products/ProductList';
import Cart from './components/cart/Cart';
import Layout from './Layout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Layout>
        <div className="content-wrapper" data-testid="content-wrapper">
          <ProductList />
          <Cart />
        </div>
      </Layout>
    </CartProvider>
  );
}

export default App;
