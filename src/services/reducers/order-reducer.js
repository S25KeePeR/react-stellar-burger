import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ALL_ORDERS,
    GET_USER_ORDERS
} from '../actions/order-action';

const initialState = {
    orderRequest: false,
    orderFailed: false,
    name: null,
    order: null,
    ordersAll: {},
    ordersUser: {}

}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return { 
                ...state, 
                order: action.order,
                name: action.name,
                orderRequest: false 
            };
        }
        case GET_ORDER_FAILED: {
            return { 
                ...state, 
                orderFailed: true, 
                orderRequest: false 
            };
        }
        case GET_ALL_ORDERS: {
            return { 
                ...state,  
                ordersAll: action.payload,
                orderRequest: false 
            };
        }
        case GET_USER_ORDERS: {
            return { 
                ...state,  
                ordersUser: action.payload,
                orderRequest: false 
            };
        }
        default: {
            return state
        }
    }
  } 