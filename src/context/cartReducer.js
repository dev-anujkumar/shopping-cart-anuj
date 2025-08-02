export default function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const exists = state.find(item => item.id === action.payload.id);
            if (exists) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }

        case 'INCREMENT_QUANTITY':
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case 'DECREMENT_QUANTITY':
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            );

        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload);

        default:
            return state;
    }
}
