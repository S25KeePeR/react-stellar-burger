import { 
    SET_USER_DATA,
    SET_USER_AUTH,
    DELETE_USER_DATA
} from "../actions/user-action";

const initialState = {
    userName: null,
    userEmail: null,

    isUserAuth: false,
    isAuthChecked: true
}

export const userReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userName: action.name,
                userEmail: action.email
            };
        }
        case SET_USER_AUTH: {
            return { 
                ...state, 
                isUserAuth: true,
            };
        }
        case DELETE_USER_DATA: {
            return { 
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