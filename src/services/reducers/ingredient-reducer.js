const initialState = {
    bun: null,
    ingredients: [],
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN:
            return {
                ...state,
                total: state.total + (action.payload.price * 2)
            };
        case REMOVE_BUN:
            return {
                ...state,
                total: state.total - (action.payload.price * 2)
            };
        case ADD_INGREDIENT:
            return {
                ...state,
                total: state.total + action.payload.price
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                total: state.total - action.payload.price
            };
        case CLEAR_TOTAL:
            return {
                ...state,
                total: 0
            };
        default:
            return state;
    }
};