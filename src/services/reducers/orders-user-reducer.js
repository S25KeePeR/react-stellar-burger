import {
    ORDERS_USER_WS_CONNECTING,
    ORDERS_USER_WS_OPEN,
    ORDERS_USER_WS_CLOSE,
    ORDERS_USER_WS_ERROR,
    ORDERS_USER_WS_MESSAGE
} from '../actions/orders-user-action';

const initialState = {
    isLoading: false,
    connected: false,
    error: null,
    orders: [],
    total: null,
    totalToday: null
}

export const ordersUserReducer = (state = initialState, action) => { 
	switch (action.type) {
		case ORDERS_USER_WS_CONNECTING:
            return {
                ...state,
                isLoading: true,
            };
        case ORDERS_USER_WS_OPEN:
            return {
                ...state,
                isLoading: false,
                connected: true,
            };
        case ORDERS_USER_WS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ORDERS_USER_WS_MESSAGE:
            return {
                ...state,
                connected: true,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        case ORDERS_USER_WS_CLOSE:
            return {
                ...state,
                connected: false,
        };
		default: 
            return state;
	};
};