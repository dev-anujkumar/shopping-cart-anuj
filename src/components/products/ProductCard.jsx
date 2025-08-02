import { useContext, useCallback, useMemo } from 'react';
import { CartContext } from '../../context/CartContext';
import Button from '../common/Button';
import './ProductCard.css';

const ProductImage = ({ src, alt }) => (
    <img src={src} alt={alt} />
);

const ProductInfo = ({ title, description, price }) => (
    <>
        <h4>{title}</h4>
        <p>{description}</p>
    </>
);

const PriceButtonRow = ({ price, children }) => (
    <div className="price-button-row">
        <div className="price">${price.toFixed(2)}</div>
        {children}
    </div>
);

function ProductCard({ product }) {
    const { cart, dispatch } = useContext(CartContext);

    const isInCart = useMemo(
        () => cart.some(item => item.id === product.id),
        [cart, product.id]
    );

    const handleAdd = useCallback(() => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    }, [dispatch, product]);

    return (
        <div className="product-card" data-testid="product-card">
            <ProductImage src={product.image} alt={product.title} />
            <ProductInfo 
                title={product.title}
                description={product.description}
                price={product.price}
            />
            <PriceButtonRow price={product.price}>
                <Button 
                    onClick={handleAdd}
                    className={isInCart ? 'btn-added' : ''}
                    disabled={isInCart}
                >
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
            </PriceButtonRow>
        </div>
    );
}

export default ProductCard;
