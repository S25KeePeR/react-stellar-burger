export const FEED_ALL_WS_CONNECT = 'FEED_ALL_WS_CONNECT';
export const FEED_ALL_WS_DISCONNECT = 'FEED_ALL_WS_DISCONNECT';

export const FEED_ALL_WS_CONNECTING = 'FEED_ALL_WS_CONNECTING';
export const FEED_ALL_WS_OPEN = 'FEED_ALL_WS_OPEN';
export const FEED_ALL_WS_CLOSE = 'FEED_ALL_WS_CLOSE';
export const FEED_ALL_WS_ERROR = 'FEED_ALL_WS_ERROR';
export const FEED_ALL_WS_MESSAGE = 'FEED_ALL_WS_MESSAGE';



export const connect = () => ({
    type: ALL_FEED_WS_CONNECT,
    payload: FEED_WS_CONNECT
});

export const disconnect = () => ({
    type: FEED_WS_DISCONNECT
});