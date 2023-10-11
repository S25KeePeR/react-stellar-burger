import {
    SELECT_INGREDIENT,
    CLEAR_INGREDIENT,
  } from '../actions/ingredient-action';

const initialState = { ingredient: null};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_INGREDIENT:
            return {
                ingredient: action.payload
            };
        case CLEAR_INGREDIENT:
            return {
                ingredient: []
            };
        default:
            return state;
    }
};