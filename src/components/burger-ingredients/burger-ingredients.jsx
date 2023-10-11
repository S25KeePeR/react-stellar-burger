import React, { useState }  from "react";
import { useSelector, useDispatch } from 'react-redux';

import { ADD_BUN, REMOVE_BUN, ADD_INGREDIENT } from "../../services/actions/constructor-action";
import { SELECT_INGREDIENT } from "../../services/actions/ingredient-action";
// import { ADD_BUN, ADD_INGREDIENT } from "../../services/actions/ingredient-action";

import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types";
// import { v4 as uuidv4 } from "uuid";

import styles from "./burger-ingredients.module.css";
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients({data, openModal}) {

    // const >>>>>>>
    const dispatch = useDispatch();
    const burgerData = useSelector(store => store.constructorReducer);
    const ingredientData = useSelector(store => store.ingredientReducer.ingredient);
    const ingredientsCategories = React.useMemo(() => ({
        'Булки': data.filter(item => item.type === 'bun'),
        'Соусы': data.filter(item => item.type === 'sauce'),
        'Начинки': data.filter(item => item.type === 'main'),
    }), [data]);
    const [current, setCurrent] = useState(Object.keys(ingredientsCategories)[0]);

    // function >>>>>>>  
    const showCounter = (num) => {
        if (num > 0) { 
            return <Counter count={num} size="default" extraClass="m-1"/>
        }
    };
    const addIngredient = (ingredient) => {
        dispatch({ type: SELECT_INGREDIENT, payload: ingredient });
        if (ingredient.type === "bun") {
            if (burgerData.bun !== null) {
                dispatch({ type: REMOVE_BUN, payload: burgerData.bun });
            } 
            dispatch({ type: ADD_BUN, payload: ingredient });
        } else {
            dispatch({ type: ADD_INGREDIENT, payload: ingredient });   
        }

    };
    // const refs = {
    //     'Булки': useRef(null),
    //     'Соусы': useRef(null),
    //     'Начинки': useRef(null),
    // };
    const handleTabClick = (tab) => {
        console.log(tab);
        // refs[tab].current.scrollIntoView({behavior: 'smooth'});
    };

    // class >>>>>>>
    const classH1 = `mt-10 mb-5 text text_type_main-large `;
    const classH2 = `mb-6 text text_type_main-medium `;
    const classContainer = `mt-10 ${styles.container} custom-scroll`;
    const classItems = `mb-10 ${styles.items}`;
    const classItem = `ml-4 mr-2 ${styles.item}`;
    const classItemTitle = `text text_type_main-default ${styles.title}`;
    const classItemText = `text text_type_digits-default ${styles.text}`;
    const classItemPrice = `${styles.price}`;
    
    // >>>>>>> 
    return (
        <section>
            <h1 className={classH1}>
                Соберите бургер
            </h1>
            <nav className={styles.menu}>
                {Object.keys(ingredientsCategories).map(section => (
                    <Tab    key={section} 
                            value={section} 
                            active={current === section} 
                            onClick={() => {
                                handleTabClick(section)
                                setCurrent(section)
                            }}
                    >
                        {section}
                    </Tab>
                ))}
            </nav>
            <div className={classContainer}>
                {Object.entries(ingredientsCategories).map(([category, ingredients]) => (
                    <div key={category}>
                        <h2 className={classH2} >
                            {category}
                        </h2>
                        <ul className={classItems} >
                            {ingredients.map((ingredient) => (
                                <li className={classItem} 
                                    key={ingredient._id} 
                                    onClick={() => {
                                        addIngredient(ingredient);
                                        openModal('ingredient');
                                    }}
                                    >
                                    {showCounter(ingredient.__v)}
                                    <img src={ingredient.image} alt={ingredient.name} width="240" height="120"/>
                                    <div className={classItemPrice}>
                                        <span className={classItemText}>{ingredient.price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                    <span className={classItemTitle}>{ingredient.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
};

// propTypes >>>>>>>
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
    openModal:  PropTypes.func.isRequired,
};