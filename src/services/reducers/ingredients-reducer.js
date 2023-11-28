import { 
    GET_INGREDIENTS, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    SELECT_TAB,
} from "../actions/ingredients-action";

const initialState = {
    baseRequest: false,
    baseFailed: false,
    base: {},
    currentTab: 'Булки'
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                baseRequest: true,
                baseFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { 
                ...state, 
                base: action.base.data,
                baseRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return { 
                ...state, 
                baseFailed: true, 
                baseRequest: false 
            };
        }
        case SELECT_TAB: {
            return { 
                ...state, 
                currentTab: action.currentTab,
            };
        }
        default: {
            return state
        }
    }
} 

  