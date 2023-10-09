import { combineReducers } from 'redux';

// список всех полученных ингредиентов
//import { ingredientsReducer } from './ingredients-reducer'; 
// список всех ингредиентов в текущем конструкторе бургера
import { constructorReducer } from '../reducers/constructor-reducer';
// объект текущего просматриваемого ингредиента
//import { ingredientReducer } from './ingredient-reducer';
// объект созданного заказа
//import { orderReducer } from './order-reducer';


// Корневой редьюсер
const rootReducer = combineReducers({
    // ingredientsReducer,
    // ingredientReducer,
    constructorReducer,
    //orderReducer
}) 

export default rootReducer;