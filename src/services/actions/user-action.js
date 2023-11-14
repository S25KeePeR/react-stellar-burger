import {
    requestRegister,
    requestLogin,
    requestLogout,
    requestRestorePassword,
    requestNewPassword,
    requestUserAuth,
    requestRefreshUserData
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

export const register = ( name, email, password ) => ( dispatch ) => { 
    requestRegister( name, email, password )
        .then((res) => {
            saveLocalStorage(res);
            dispatch({
                type: SET_USER_DATA,
                email: res.user.email,
                name: res.user.name
            });
        })
};

export const logIn = ( email, password ) => ( dispatch ) => { 
    requestLogin( email, password )
        .then ((res) => {
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
        }) 
};

export const logOut = ( token ) => ( dispatch ) => { 
    requestLogout( token )
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({ type: DELETE_USER_DATA });
        })
};

export const  forgotPassword = ( email ) => ( dispatch ) => { 
    requestRestorePassword( email )
        .then((res) => {
            localStorage.setItem('forgotPassword', res.success);
        })
};

export const resetPassword =( password, token ) => ( dispatch ) => { 
    requestNewPassword( password, token )
        .then(() => {
            localStorage.removeItem('forgotPassword');
        })
};

export const checkUserAuth = () => ( dispatch ) => { 
    requestUserAuth()
        .then((res) => {
            dispatch({ type: SET_USER_AUTH });
            dispatch({
                type: SET_USER_DATA,
                email: res.user.email,
                name: res.user.name
            });
        })
};

export const editUserData = ( name, email, password ) => ( dispatch ) => { 
    requestRefreshUserData( name, email, password )
        .then((res) => {
            dispatch({
                type: SET_USER_DATA,
                email: res.user.email,
                name: res.user.name
            });
        })
};


/////////////////////////////////////
// export function register( name, email, password ) { 
//     return async function( dispatch ) { 
//         try {
//             const res = await requestRegister( name, email, password );
//             if ( res && res.success ) {
//                 saveLocalStorage(res);
//                 dispatch({
//                     type: SET_USER_DATA,
//                     email: res.user.email,
//                     name: res.user.name
//                 });
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(`Ответ сервера: ${error}`);
//         }
//     }
// };

// export function logIn( email, password) { 
//     return async function( dispatch ) { 
//         try {
//             const res = await requestLogin( email, password );
//             if ( res && res.success ) { 
//                 saveLocalStorage(res);
//                 dispatch({
//                     type: SET_USER_DATA,
//                     email: res.user.email,
//                     name: res.user.name
//                 });
//                 dispatch({
//                     type: SET_USER_AUTH,
//                     isUserAuth: res.success
//                 });
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(`Ответ сервера: ${error}`);
//         }
//     }
// };

// export function logOut( token ) { 
//     return async function( dispatch ) { 
//         try {
//             const res = await requestLogout( token );
//             if ( res && res.success ) {
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 dispatch({ type: DELETE_USER_DATA });
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(`Ответ сервера: ${error}`);
//         }
//     }
// };

// export function forgotPassword( email ) { 
//     return async function( dispatch ) { 
//         try {
//             const res = await requestRestorePassword( email );
//             if ( res && res.success ) {
//                 localStorage.setItem('forgotPassword', res.success);
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(`Ответ сервера: ${error}`);
//         }
//     }
// };

// export function resetPassword( password, token ) { 
//     return async function( dispatch ) { 
//         try {
//             const res = await requestNewPassword( password, token );
//             if ( res && res.success ) {
//                 localStorage.removeItem('forgotPassword');
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(`Ответ сервера: ${error}`);
//         }
//     }
// };

// export function checkUserAuth() { 
//     return async function( dispatch ) {
//         try {
//             const res = await getRefreshUserData();
//             if ( res && res.success ) {
//                 dispatch({ type: SET_USER_AUTH });
//                 dispatch({
//                     type: SET_USER_DATA,
//                     email: res.user.email,
//                     name: res.user.name
//                 });
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(error.message);
//         }
//     }
// };

// export function editUserData( name, email, password ) { 
//     return async function( dispatch ) {
//         try {
//             const res = await patchRefreshUserData( name, email, password );
//             if ( res && res.success ) {
//                 dispatch({
//                     type: SET_USER_DATA,
//                     email: res.user.email,
//                     name: res.user.name
//                 });
//                 return res.success
//             } else {
//                 throw new Error('Некорректные данные');
//             };
//         } catch ( error ) {
//             throw new Error(error.message);
//         }
//     }
// };
