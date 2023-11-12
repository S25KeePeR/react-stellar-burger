import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients-reducer';  // список всех полученных ингредиентов
import { constructorReducer } from '../reducers/constructor-reducer'; // список всех ингредиентов в текущем конструкторе бургера
import { ingredientReducer } from './ingredient-reducer'; // объект текущего просматриваемого ингредиента
import { orderReducer } from './order-reducer'; // объект созданного заказа
import { userReducer } from './user-reducer';

// Корневой редьюсер
const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    ingredientReducer,
    orderReducer,
    userReducer,
}) 

export default rootReducer;