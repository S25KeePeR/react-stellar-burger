export const FEED_WSS_CONNECT = 'FEED_WSS_CONNECT';
export const FEED_WSS_CONNECTING = 'FEED_WSS_CONNECTING';
export const FEED_WSS_ERROR = 'FEED_WSS_ERROR';
export const FEED_WSS_OPEN = 'FEED_WSS_OPEN';
export const FEED_WSS_CLOSE = 'FEED_WSS_CLOSE';
export const FEED_WSS_MESSAGE = 'FEED_WSS_MESSAGE';
export const FEED_WSS_DISCONNECT = 'FEED_WSS_DISCONNECT';

export const connect = (url) => ({
    type: FEED_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: FEED_DISCONNECT
});