import { 
    GET_INGREDIENTS, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    SELECT_TAB,
    ADD_VALUE,
    DELETE_VALUE,
    DELETE_BUN_VALUE,
    RESET_VALUE
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
        case ADD_VALUE: {
            return {
                ...state,
                base: state.base.map((element) => {
                    if (element._id === action.newIngredient._id) {
                        return {
                            ...element,
                            __v: element.type === 'bun' ? 1 : ++element.__v,
                        }
                    } else {
                        return element;
                    }
                })
            };
        }
        case DELETE_VALUE: {
            return {
                ...state,
                base: state.base.map((element) => {
                    if (element._id === action.item._id) {
                        return {
                            ...element,
                            __v: element.type === 'bun' ? 1 : --element.__v,
                        }
                    } else {
                        return element;
                    }
                })
            };
        }
        case DELETE_BUN_VALUE: {
            return {
                ...state,
                base: state.base.map((element) => {
                    if (element.type === 'bun') {
                        return {
                            ...element,
                            __v: element._id !== action.newIngredient._id ? 0 : null,
                        }
                    } else {
                        return element;
                    }
                })
            };
        }
        case RESET_VALUE: {
            return {
                ...state,
                base: state.base.map((element) => {
                    return {
                        ...element,
                        __v: 0,
                    }
                })
            };
        }
        default: {
            return state
        }
    }
} 

  