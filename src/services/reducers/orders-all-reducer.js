import {
    ORDERS_ALL_WS_CONNECTING,
    ORDERS_ALL_WS_OPEN,
    ORDERS_ALL_WS_CLOSE,
    ORDERS_ALL_WS_ERROR,
    ORDERS_ALL_WS_MESSAGE
} from "../actions/orders-all-action";

const initialState = {
    isLoading: false,
    connected: false,
    error: null,
    orders: [],
    total: null,
    totalToday: null
}

export const ordersAllReducer = (state = initialState, action) => { 
	switch (action.type) {
		case ORDERS_ALL_WS_CONNECTING:
            return {
                ...state,
                isLoading: true,
            };
        case ORDERS_ALL_WS_OPEN:
            return {
                ...state,
                connected: true,
            };
        case ORDERS_ALL_WS_ERROR:
            return {
                ...state,
                error: 'error',
            };
        case ORDERS_ALL_WS_MESSAGE:
            return {
                ...state,
				isLoading: false,
                connected: true,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        case ORDERS_ALL_WS_CLOSE:
            return {
                ...state,
				isLoading: false,
                connected: false,
        };
		default: 
            return state;
	};
};