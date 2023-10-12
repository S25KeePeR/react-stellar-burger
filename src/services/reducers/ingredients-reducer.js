import { 
    GET_INGREDIENTS, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED 
} from "../actions/ingredients-action";

const initialState = {
    baseRequest: false,
    baseFailed: false,
    base: {}
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
        default: {
            return state
        }
    }
  } 