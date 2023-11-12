import {
    registerUser,
    loginUser,
    logoutUser,
    sendEmail,
    sendNewPassword,
    getRefreshUserData,
    patchRefreshUserData
} from "../../utils/api";

export const SET_USER_DATA = 'SET_USER_DATA';
export const DELETE_USER_DATA = 'DELETE_USER_DATA';
export const SET_USER_AUTH = 'SET_USER_AUTH';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';


const saveLocalStorage = ( res ) => {
    // localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
}


export function register( name, email, password ) { 
    return async function( dispatch ) { 
        try {
            const res = await registerUser( name, email, password );
            if ( res && res.success ) {
                saveLocalStorage(res);
                dispatch({
                    type: SET_USER_DATA,
                    email: res.user.email,
                    name: res.user.name
                });
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(`Ответ сервера: ${error}`);
        }
    }
};

export function logIn( email, password) { 
    return async function( dispatch ) { 
        try {
            const res = await loginUser( email, password );
            if ( res && res.success ) { 
                saveLocalStorage(res);
                dispatch({
                    type: SET_USER_DATA,
                    email: res.user.email,
                    name: res.user.name
                });
                dispatch({
                    type: SET_USER_AUTH,
                    isUserAuth: res.success
                });
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(`Ответ сервера: ${error}`);
        }
    }
};

export function logOut( token ) { 
    return async function( dispatch ) { 
        try {
            const res = await logoutUser( token );
            if ( res && res.success ) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({ type: DELETE_USER_DATA });
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(`Ответ сервера: ${error}`);
        }
    }
};

export function forgotPassword( email ) { 
    return async function( dispatch ) { 
        try {
            const res = await sendEmail( email );
            if ( res && res.success ) {
                localStorage.setItem('forgotPassword', res.success);
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(`Ответ сервера: ${error}`);
        }
    }
};

export function resetPassword( password, token ) { 
    return async function( dispatch ) { 
        try {
            const res = await sendNewPassword( password, token );
            if ( res && res.success ) {
                localStorage.removeItem('forgotPassword');
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(`Ответ сервера: ${error}`);
        }
    }
};

export function checkUserAuth() { 
    return async function( dispatch ) {
        try {
            const res = await getRefreshUserData();
            if ( res && res.success ) {
                dispatch({ type: SET_USER_AUTH });
                dispatch({
                    type: SET_USER_DATA,
                    email: res.user.email,
                    name: res.user.name
                });
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(error.message);
        }
    }
};

export function editUserData( name, email, password ) { 
    return async function( dispatch ) {
        try {
            const res = await patchRefreshUserData( name, email, password );
            if ( res && res.success ) {
                dispatch({
                    type: SET_USER_DATA,
                    email: res.user.email,
                    name: res.user.name
                });
                return res.success
            } else {
                throw new Error('Некорректные данные');
            };
        } catch ( error ) {
            throw new Error(error.message);
        }
    }
};
