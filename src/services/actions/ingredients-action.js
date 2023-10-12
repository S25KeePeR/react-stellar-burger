import {api} from "../../utils/api";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';


export const getBase = () => {
    return async function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        try {
            let res = await api.get('ingredients');
            let resData = res.data;
            if (res && resData.success && Array.isArray(resData.data) && resData.data.length !== 0) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    base: resData
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
            })
            console.log(error); 
        }
    }
} 