import { useCallback }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

// project modules >>>>>>>
import { getOrder } from "../../services/actions/order-action";
import { ADD_BUN, REMOVE_BUN, ADD_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions/constructor-action";
import { ADD_VALUE, DELETE_BUN_VALUE } from '../../services/actions/ingredients-action';

import { v4 as uuidv4 } from "uuid";

import PropTypes from "prop-types";

import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import CardConstructor from '../card-constructor/card-constructor';
import styles from "./burger-constructor.module.css";

export default function BurgerConstructor({openModal}) {

	// const >>>>>>>
    const dispatch = useDispatch();
    const burgerData = useSelector(store => store.constructorReducer);
    const { isUserAuth } = useSelector(state => state.userReducer);
    const navigate = useNavigate();

	// function >>>>>>>
    const [, dropTarget] = useDrop({
        accept: "BOX",
        drop(item) {
            addIngredient(item);
        },
    });
    const submitOrder = (e) => {
        e.preventDefault();
        const listID = {
            ingredients: [  burgerData.bun._id, 
                            ...burgerData.ingredients.map(ingredient => ingredient._id), 
                            burgerData.bun._id ] 
        }

        if ( !isUserAuth ) {
            navigate("/login");
        } else {
            openModal('Order');
            dispatch(getOrder(listID));
        }


    };
    
    const addIngredient = (ingredient) => {
        const newIngredient = new Object({...ingredient, UID: uuidv4()})
        if (newIngredient.type === "bun") {
            if (burgerData.bun !== null) {
                dispatch({ type: REMOVE_BUN, payload: burgerData.bun });  
            } 
            dispatch({ type: ADD_BUN, payload: newIngredient });
            dispatch({ type: DELETE_BUN_VALUE, newIngredient });
        } else {
            dispatch({ type: ADD_INGREDIENT, payload: newIngredient });   
        }
        dispatch({type: ADD_VALUE, newIngredient})
    };

    const moveIngredient = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch({ type: MOVE_INGREDIENT, payload: {dragIndex, hoverIndex}}) 
        }, [burgerData]
    );

    // styles >>>>>>>
    const classContainer = `${styles.container}`;
    const classConstructor = `mt-20 pt-5 mb-5 pl-4 ${styles.constructor}`;
    const classMR = ` mr-3`;
    const classIngredients = `pr-1 ${styles.ingredients} custom-scroll`;
    const classFooter = `mr-4 mt-5 ${styles.footer}`;
    const classTotal = `mr-10 ${styles.total}`;
    const classTotalTitle = `mr-4 text text_type_digits-medium`;
    const classItem = `mr-4 ${styles.item}`;
    const classItemTop = `mr-4 ${classItem} ${styles.top}`;
    const classItemBot = `mr-4 ${classItem} ${styles.bot}`;

	// >>>>>>> 
    return (
        <section className={classContainer}>
            <ul className={classConstructor} ref={dropTarget}>
                <li>
                    {burgerData.bun === null ? (
                        <span className={classItemTop}>выберите булку</span> 
                    ) : (
                        <ConstructorElement type="top"
                                            isLocked={true}
                                            text={`${burgerData.bun.name} (верх)`}
                                            price={burgerData.bun.price}
                                            thumbnail={burgerData.bun.image}
                                            extraClass={classMR}
                        />
                    )}  
                </li>
                <li>
                    {burgerData.ingredients.length === 0 ? (
                        <span className={classItem}>выберите ингредиенты</span> 
                    ) : (
                        <ul className={classIngredients}>
                            {burgerData.ingredients.map((ingredient, index) => (
                                <CardConstructor    key={ingredient.UID}
                                                    index={index}
                                                    id={ingredient.UID}
                                                    ingredient={ingredient}
                                                    moveIngredient={moveIngredient}
                                />
                            ))}
                        </ul>
                    )}    
                </li>
                <li>
                    {burgerData.bun === null ? (
                        <span className={classItemBot}></span> 
                    ) : (
                        <ConstructorElement type="bottom"
                                            isLocked={true}
                                            text={`${burgerData.bun.name} (низ)`}
                                            price={burgerData.bun.price}
                                            thumbnail={burgerData.bun.image}
                                            extraClass={classMR}
  
                        />
                    )} 
                </li>
            </ul>
            <div className={classFooter}>
                <div className={classTotal}>
                    <span className={classTotalTitle}>
                        {burgerData.total}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button     htmlType="button" 
                            type="primary" 
                            size="large"
                            disabled={burgerData.bun === null ? true : burgerData.ingredients.length === 0 ? true : false}
                            onClick={submitOrder}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

// propTypes >>>>>>>
BurgerConstructor.propTypes = {
    openModal:  PropTypes.func.isRequired,
};