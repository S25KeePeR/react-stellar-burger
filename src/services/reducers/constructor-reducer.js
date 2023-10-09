import {
    ADD_BUN_PRICE,
    REMOVE_BUN_PRICE,
    ADD_INGREDIENT_PRICE,
    REMOVE_INGREDIENT_PRICE,
    CLEAR_TOTAL_PRICE,
  } from '../actions/constructor-action';

const initialState = { total: 0 };

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN_PRICE:
            return {
                ...state,
                total: state.total + (action.payload.price * 2)
            };
        case REMOVE_BUN_PRICE:
            return {
                ...state,
                total: state.total - (action.payload.price * 2)
            };
        case ADD_INGREDIENT_PRICE:
            return {
                ...state,
                total: state.total + action.payload.price
            };
        case REMOVE_INGREDIENT_PRICE:
            return {
                ...state,
                total: state.total - action.payload.price
            };
        case CLEAR_TOTAL_PRICE:
            return {
                ...state,
                total: 0
            };
        default:
            return state;
    }
};