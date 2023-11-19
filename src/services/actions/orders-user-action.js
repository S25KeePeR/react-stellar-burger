export const ORDERS_USER_WS_CONNECT = 'ORDERS_USER_WS_CONNECT';
export const ORDERS_USER_WS_DISCONNECT = 'ORDERS_USER_WS_DISCONNECT';

export const ORDERS_USER_WS_CONNECTING = 'ORDERS_USER_WS_CONNECTING';
export const ORDERS_USER_WS_OPEN = 'ORDERS_USER_WS_OPEN';
export const ORDERS_USER_WS_CLOSE = 'ORDERS_USER_WS_CLOSE';
export const ORDERS_USER_WS_ERROR = 'ORDERS_USER_WS_ERROR';
export const ORDERS_USER_WS_MESSAGE = 'ORDERS_USER_WS_MESSAGE';

export const connect = (url) => ({
    type: ORDERS_USER_WS_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: ORDERS_USER_WS_DISCONNECT
});