import { v4 as uuidv4 } from "uuid";
import {
    ADD_BUN,
    REMOVE_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
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
        case DELETE_INGREDIENT: 
            return {
                ...state,
                ingredients: [...state.ingredients].filter(
                    (ingredient) => {
                        return ingredient.UID !== action.item.UID;
                    }
                ),
                total: state.total - action.item.price
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