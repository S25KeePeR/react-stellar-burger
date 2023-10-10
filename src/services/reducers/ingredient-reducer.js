// import {
//     ADD_BUN,
//     REMOVE_BUN,
//     ADD_INGREDIENT,
//     REMOVE_INGREDIENT,
//     CLEAR_INGREDIENTS,
//   } from '../actions/ingredient-action';

// const initialState = {
//     bun: null,
//     ingredients: [],
// };

// export const ingredientReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_BUN:
//             return {
//                 ...state,
//                 bun: action.payload
//             };
//         case REMOVE_BUN: // пока не понятно зачем это
//             return {
//                 ...state,
//                 bun: null 
//             };
//         case ADD_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, action.payload]
//             };
//         case REMOVE_INGREDIENT: // доработать когда понадобится удалять ингредиенты из бургера
//             return {
//                 ...state,
//                 ingredients: []
//             };
//         case CLEAR_INGREDIENTS: // доработать когда понадобится удалять ингредиенты из бургера
//         return {
//             bun: null,
//             ingredients: [],
//         };
//         default:
//             return state;
//     }
// };