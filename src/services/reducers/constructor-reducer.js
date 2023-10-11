import {
    ADD_BUN,
    REMOVE_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    CLEAR,
  } from '../actions/constructor-action';

const initialState = {
    bun: null,
    ingredients: [],
    total: 0 
};


export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN:
            return {
                ...state,
                bun: action.payload,
                total: state.total  + (action.payload.price * 2)
            };
        case REMOVE_BUN: 
            return {
                ...state,
                total: state.total - (action.payload.price * 2)
            };
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                total: state.total + action.payload.price
            };
        case REMOVE_INGREDIENT: // доработать когда понадобится удалять ингредиенты из бургера
            return {
                ...state,
                total: state.total - action.payload.price
            };
        case CLEAR:
            return {
                bun: null,
                ingredients: [],
                total: 0 
            };
        default:
            return state;
    }
};