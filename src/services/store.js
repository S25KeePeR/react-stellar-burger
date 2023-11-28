import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';

import { 
    ORDERS_ALL_WS_CONNECT,
    ORDERS_ALL_WS_DISCONNECT,
    ORDERS_ALL_WS_CONNECTING,
    ORDERS_ALL_WS_OPEN,
    ORDERS_ALL_WS_CLOSE,
    ORDERS_ALL_WS_ERROR,
    ORDERS_ALL_WS_MESSAGE
} from './actions/orders-all-action';
import { 
    ORDERS_USER_WS_CONNECT,
    ORDERS_USER_WS_DISCONNECT,
    ORDERS_USER_WS_CONNECTING,
    ORDERS_USER_WS_OPEN,
    ORDERS_USER_WS_CLOSE,
    ORDERS_USER_WS_ERROR,
    ORDERS_USER_WS_MESSAGE
} from './actions/orders-user-action';

const ordersAllMiddleware = socketMiddleware({
    wsConnect: ORDERS_ALL_WS_CONNECT,
    wsDisconnect: ORDERS_ALL_WS_DISCONNECT,
    wsConnecting: ORDERS_ALL_WS_CONNECTING,
    onOpen: ORDERS_ALL_WS_OPEN,
    onClose: ORDERS_ALL_WS_CLOSE,
    onError: ORDERS_ALL_WS_ERROR,
    onMessage: ORDERS_ALL_WS_MESSAGE
});

const ordersUserMiddleware = socketMiddleware({
    wsConnect: ORDERS_USER_WS_CONNECT,
    wsDisconnect: ORDERS_USER_WS_DISCONNECT,
    wsConnecting: ORDERS_USER_WS_CONNECTING,
    onOpen: ORDERS_USER_WS_OPEN,
    onClose: ORDERS_USER_WS_CLOSE,
    onError: ORDERS_USER_WS_ERROR,
    onMessage: ORDERS_USER_WS_MESSAGE
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersAllMiddleware, ordersUserMiddleware)
});


// import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk';
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 

// const enhancer = composeEnhancers(applyMiddleware(
// 	thunkMiddleware,
// 	));
// export const store = createStore(rootReducer, enhancer);