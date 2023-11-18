import { requestOrder } from "../../utils/api";
import { CLEAR } from "./constructor-action";
import { RESET_VALUE } from "./ingredients-action";

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export function getOrder(listID) {
    return async function(dispatch) {
        dispatch({
            type: GET_ORDER
        })
        try {
            const res = await requestOrder(listID);
            if (res && res.success && res.order.number !== 0) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.order.number,
                    name: res.name
                })
                dispatch({type: CLEAR});
                dispatch({type: RESET_VALUE});
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
                throw new Error('Некорректные данные');
            }
        } catch (error) {
            dispatch({
                type: GET_ORDER_FAILED
            });
            throw new Error(`Ошибка сервера ${error}`);
        }
    }
}