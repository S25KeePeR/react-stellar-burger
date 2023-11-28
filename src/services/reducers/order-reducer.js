import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_DETAILS,
    GET_CLEAR
} from '../actions/order-action';

const initialState = {
    isLoading: false,
    orderRequest: false,
    orderFailed: false,
    name: null,
    order: null,
    details: []
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
        case GET_ORDER_DETAILS: {
            return {
                ...state,
				details: action.payload,
                orderRequest: false,
            };
        }
        case GET_CLEAR: {
            return {
                ...state,
                order: null,
                details: []
            };
        }
        default: {
            return state
        }
    }
  } 