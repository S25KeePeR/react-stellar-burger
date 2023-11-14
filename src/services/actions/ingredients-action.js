import { requestBase } from "../../utils/api";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const SELECT_TAB = 'SELECT_TAB';
export const ADD_VALUE = 'ADD_VALUE';
export const DELETE_VALUE = 'DELETE_VALUE';
export const DELETE_BUN_VALUE = 'DELETE_BUN_VALUE';
export const RESET_VALUE = 'RESET_VALUE';

export const getBase = () => ( dispatch ) => { 
    dispatch({ type: GET_INGREDIENTS })
    requestBase()
        .then( (res) => {
            if ( Array.isArray(res.data) && res.data.length > 0 ) {
                dispatch({ 
                    type: GET_INGREDIENTS_SUCCESS,
                    base: res
                })
            } else {
                throw new Error('Некорректная или пустая база');
            }
        })
        .catch ((err) => {
            dispatch({ type: GET_INGREDIENTS_FAILED })
        })
};
