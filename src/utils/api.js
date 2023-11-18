// base url >>>>>>>
const API_URL = "https://norma.nomoreparties.space/api/";

// functions >>>>>>>
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
    return res && res.success ? res : Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
    return fetch(`${API_URL}${endpoint}`, options)
      .then(checkResponse)
      .then(checkSuccess);
};

export const fetchWithRefresh = async ( endpoint, options ) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await requestRefreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${API_URL}${endpoint}`, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

// request >>>>>>>
export const requestBase = () => request( 'ingredients' );

export const requestOrder = (listID) => request( 'orders', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        ingredients: listID.ingredients
    })
});

export const requestRegister =  ( userName, userEmail, userPassword ) => request( 'auth/register' , {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: userEmail, 
        password: userPassword, 
        name: userName 
    })
});

export const requestLogin = ( userEmail, userPassword ) => request( 'auth/login', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: userEmail, 
        password: userPassword
    })
});

export const requestLogout =  () => request( 'auth/logout', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
    })
});

export const requestRestorePassword = ( userEmail ) => request( 'password-reset', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: userEmail
    })
});

export const requestNewPassword =  ( userPassword, emailCode ) => request( 'password-reset/reset', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        password: userPassword,
        token: emailCode
    })
});

export const requestRefreshToken = () => request( 'auth/token', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
    })
});

export const requestUserAuth = () => fetchWithRefresh( 'auth/user', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('accessToken')
    }
});

export const requestRefreshUserData = ( newName, newEmail, newPassword ) => fetchWithRefresh( 'auth/user', {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
        email: newEmail, 
        password: newPassword, 
        name: newName 
    })
});