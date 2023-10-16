import { requestBase } from "../../utils/api";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const SELECT_TAB = 'SELECT_TAB';
export const ADD_VALUE = 'ADD_VALUE';
export const DELETE_VALUE = 'DELETE_VALUE';
export const DELETE_BUN_VALUE = 'DELETE_BUN_VALUE';
export const RESET_VALUE = 'RESET_VALUE';

export function getBase() {
    return async function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        try {
            const res = await requestBase();
            if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    base: res
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
                throw new Error('Некорректные данные или пустая база');
            }
        } catch (error) {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
            throw new Error(`Ошибка сервера ${error}`);
        }
    }
}