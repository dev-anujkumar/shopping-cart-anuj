import cartReducer from '../../context/cartReducer';

describe('cartReducer', () => {
  const initialState = [];

  test('should return initial state', () => {
    expect(cartReducer([], {})).toEqual(initialState);
  });

  test('should handle ADD_TO_CART for new item', () => {
    const product = { id: 1, title: 'Test Product', price: 29.99 };
    const action = { type: 'ADD_TO_CART', payload: product };

    const newState = cartReducer(initialState, action);
    expect(newState).toEqual([{ ...product, quantity: 1 }]);
  });

  test('should handle ADD_TO_CART for existing item', () => {
    const existingItem = { id: 1, title: 'Test Product', price: 29.99, quantity: 1 };
    const product = { id: 1, title: 'Test Product', price: 29.99 };
    const action = { type: 'ADD_TO_CART', payload: product };
    const newState = cartReducer([existingItem], action);
    expect(newState).toEqual([{ ...product, quantity: 2 }]);
  });

  test('should handle INCREMENT_QUANTITY', () => {
    const existingItem = { id: 1, title: 'Test Product', price: 29.99, quantity: 1 };
    const action = { type: 'INCREMENT_QUANTITY', payload: 1 };
    const newState = cartReducer([existingItem], action);

    expect(newState).toEqual([{ ...existingItem, quantity: 2 }]);
  });

  test('should handle DECREMENT_QUANTITY', () => {
    const existingItem = { id: 1, title: 'Test Product', price: 29.99, quantity: 2 };
    const action = { type: 'DECREMENT_QUANTITY', payload: 1 };
    const newState = cartReducer([existingItem], action);

    expect(newState).toEqual([{ ...existingItem, quantity: 1 }]);
  });

  test('should handle REMOVE_FROM_CART', () => {
    const existingItems = [
      { id: 1, title: 'Product 1', price: 29.99, quantity: 1 },
      { id: 2, title: 'Product 2', price: 39.99, quantity: 2 }
    ];
    const action = { type: 'REMOVE_FROM_CART', payload: 1 };

    const newState = cartReducer(existingItems, action);

    expect(newState).toEqual([{ id: 2, title: 'Product 2', price: 39.99, quantity: 2 }]);
  });

  test('should handle unknown action type', () => {
    const existingItem = { id: 1, title: 'Test Product', price: 29.99, quantity: 1 };
    const action = { type: 'UNKNOWN_ACTION', payload: {} };
    const newState = cartReducer([existingItem], action);

    expect(newState).toEqual([existingItem]);
  });

  test('should handle multiple items correctly', () => {
    const initialState = [
      { id: 1, title: 'Product 1', price: 29.99, quantity: 1 },
      { id: 2, title: 'Product 2', price: 39.99, quantity: 2 }
    ];

    const newProduct = { id: 3, title: 'Product 3', price: 49.99 };
    const addAction = { type: 'ADD_TO_CART', payload: newProduct };

    let newState = cartReducer(initialState, addAction);
    expect(newState).toHaveLength(3);
    expect(newState[2]).toEqual({ ...newProduct, quantity: 1 });

    const incrementAction = { type: 'INCREMENT_QUANTITY', payload: 1 };
    newState = cartReducer(newState, incrementAction);
    expect(newState[0].quantity).toBe(2);

    const decrementAction = { type: 'DECREMENT_QUANTITY', payload: 2 };
    newState = cartReducer(newState, decrementAction);
    expect(newState[1].quantity).toBe(1);
  });
});