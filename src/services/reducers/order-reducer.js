import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS
} from '../actions/order-action';

const initialState = {
    isLoading: false,
    orderRequest: false,
    orderFailed: false,
    name: null,
    order: null
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

        default: {
            return state
        }
    }
  } 