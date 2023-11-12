const BASE_URL = "https://norma.nomoreparties.space/api";

function onResponse(res) {
    // return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestBase = async () => {
    const res = await fetch(`${BASE_URL}/ingredients`);
    return onResponse(res);
}

export const requestOrder = async (listID) => {
    const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: listID.ingredients
        })
    });
    return onResponse(res);
}

export const registerUser = async ( userName, userEmail, userPassword ) => { 
    const res = await fetch(`${BASE_URL}/auth/register`, {
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
    return onResponse(res);
}

export const loginUser = async ( userEmail, userPassword ) => { 
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail, 
            password: userPassword
        })
    });
    return onResponse(res);
}

export const logoutUser = async () => { 
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
    return onResponse(res);
}



export const sendEmail = async ( userEmail ) => {
    const res = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail
        })
    });
    return onResponse(res);
}

export const sendNewPassword = async ( userPassword, emailCode ) => { 
    const res = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: userPassword,
            token: emailCode
        })
    });
    return onResponse(res);
}

////////////////////////// 

// export const getRefreshUserData = async () => { 
//     await fetch(`${BASE_URL}/auth/user`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             authorization: localStorage.getItem('accessToken')
//         }
//     });
//     // console.log(res)
//     // return onResponse(res);
// }

export const refreshToken = async () => { 
    const res = await fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    });
    console.log(res)
    return onResponse(res);
}


export const getRefreshUserData = () => fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('accessToken')
    }
});

export const patchRefreshUserData = ( newUserName, newUserEmail, newUserPassword ) => fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
        email: newUserEmail, 
        password: newUserPassword, 
        name: newUserName 
    })
});


export const fetchWithRefresh = async ( url, options ) => {
    try {
        const res = await fetch(url, options);
        return await onResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await onResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
  };