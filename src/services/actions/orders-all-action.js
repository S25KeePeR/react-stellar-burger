export const ORDERS_ALL_WS_CONNECT = 'ORDERS_ALL_WS_CONNECT';
export const ORDERS_ALL_WS_DISCONNECT = 'ORDERS_ALL_WS_DISCONNECT';

export const ORDERS_ALL_WS_CONNECTING = 'ORDERS_ALL_WS_CONNECTING';
export const ORDERS_ALL_WS_OPEN = 'ORDERS_ALL_WS_OPEN';
export const ORDERS_ALL_WS_CLOSE = 'ORDERS_ALL_WS_CLOSE';
export const ORDERS_ALL_WS_ERROR = 'ORDERS_ALL_WS_ERROR';
export const ORDERS_ALL_WS_MESSAGE = 'ORDERS_ALL_WS_MESSAGE';

export const connect = (url) => ({
    type: ORDERS_ALL_WS_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: ORDERS_ALL_WS_DISCONNECT
});