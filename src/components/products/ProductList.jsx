import { useEffect, useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const memoizedProducts = useMemo(() => products, [products]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="product-list" data-testid="product-list">
            {memoizedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
