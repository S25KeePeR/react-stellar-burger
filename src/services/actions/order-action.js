import { 
    requestOrder,
    requestAllOrders,
    requestUserOrders
} from "../../utils/api";
import { CLEAR } from "./constructor-action";
import { RESET_VALUE } from "./ingredients-action";

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_USER_ORDERS = 'GET_USER_ORDERS';

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

export const getAllOrders = () => ( dispatch ) => { 
    dispatch({
        type: GET_ORDER
    })
    requestAllOrders( )
        .then((res) => {
            dispatch({
                type: GET_ALL_ORDERS,
                payload: res
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_ORDER_FAILED
            });
        })
};


// export const getUserOrders = () => ( dispatch ) => { 
//     dispatch({
//         type: GET_ORDER
//     })
//     requestUserOrders( )
//         .then((res) => {
//             dispatch({
//                 type: GET_USER_ORDERS,
//                 payload: res
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: GET_ORDER_FAILED
//             });
//         })
// };