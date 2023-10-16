const BASE_URL = "https://norma.nomoreparties.space/api";

function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
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