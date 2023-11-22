import { requestOrder } from "../../utils/api";
import { CLEAR } from "./constructor-action";
import { requestOrderDetails } from "../../utils/api";


export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const GET_CLEAR = 'GET_CLEAR';

export const getOrder = ( listID ) => ( dispatch ) => { 
    requestOrder(listID.ingredients)
        .then((res) => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: res.order.number,
                name: res.name
            })
            dispatch({
                type: CLEAR
            });
        })
        .catch(() => {
            dispatch({
                type: GET_ORDER_FAILED
            });
        })
};


export const getOrderDetails = (order) => ( dispatch ) => { 
    dispatch({type: GET_ORDER});
    requestOrderDetails(order)
        .then((res) => {
            dispatch({
                type: GET_ORDER_DETAILS,
                payload: res.orders
            });
            
        })
};