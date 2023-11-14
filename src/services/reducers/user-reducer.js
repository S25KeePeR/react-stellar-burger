import { 
    SET_USER_DATA,
    SET_USER_AUTH,
    DELETE_USER_DATA,
    SET_AUTH_CHECKED,

} from "../actions/user-action";

const initialState = {
    userName: null,
    userEmail: null,

    isUserAuth: false,
    isAuthChecked: true,

}

export const userReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_AUTH_CHECKED: {
            return {
              ...state,
              isAuthChecked: true
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                userName: action.name,
                userEmail: action.email,
                isAuthChecked: true
            };
        }
        case SET_USER_AUTH: {
            return { 
                ...state, 
                isUserAuth: true,
                isAuthChecked: true
            };
        }
        case DELETE_USER_DATA: {
            return {
                ...state, 
                userName: null,
                userEmail: null,
                isUserAuth: false,
            };
        }
        default: {
            return state
        }
    }
};