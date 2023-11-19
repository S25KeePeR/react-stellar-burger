import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';



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

const feedAllMiddleware = socketMiddleware({
  wsConnect: FEED_ALL_WS_CONNECT,
  wsDisconnect: FEED_ALL_WS_DISCONNECT,
  wsConnecting: FEED_ALL_WS_CONNECTING,
  onOpen: FEED_ALL_WS_OPEN,
  onClose: FEED_ALL_WS_CLOSE,
  onError: FEED_ALL_WS_ERROR,
  onMessage: FEED_ALL_WS_MESSAGE
});

const feedUserMiddleware = socketMiddleware({
  wsConnect: FEED_USER_WS_CONNECT,
  wsDisconnect: FEED_USER_WS_DISCONNECT,
  wsConnecting: FEED_USER_WS_CONNECTING,
  onOpen: FEED_USER_WS_OPEN,
  onClose: FEED_USER_WS_CLOSE,
  onError: FEED_USER_WS_ERROR,
  onMessage: FEED_USER_WS_MESSAGE
});





export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(allFeedMiddleware, userFeedMiddleware)
});