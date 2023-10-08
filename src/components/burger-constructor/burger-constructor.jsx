import { useContext } from "react";
import PropTypes from "prop-types";
//import ingredientPropType from "../../utils/prop-types";
import { v4 as uuidv4 } from "uuid";
import api from "../../utils/api";

import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorContext } from "../../services/constructorContext";
import { OrderDetailsContext } from "../../services/orderDetailsContext";

export default function BurgerConstructor({openModal}) {

	// const >>>>>>>

    const { burgerData, state } = useContext(ConstructorContext);
	const { setOrderData, setIsLoading, setError } = useContext(OrderDetailsContext);

	// class >>>>>>>

    const classContainer = `${styles.container}`;
    const classConstructor = `mt-20 pt-5 mb-5 pl-4 ${styles.constructor}`;
    const classMR = ` mr-3`;
    const classIngredients = `pr-1 ${styles.ingredients} custom-scroll`;
    const classIngredient = `${styles.ingredient}`;
    const classFooter = `mr-4 mt-5 ${styles.footer}`;
    const classTotal = `mr-10 ${styles.total}`;
    const classTotalTitle = `mr-4 text text_type_digits-medium`;
    const classItem = `mr-4 ${styles.item}`;
    const classItemTop = `mr-4 ${classItem} ${styles.top}`;
    const classItemBot = `mr-4 ${classItem} ${styles.bot}`;
 
	// function >>>>>>>

    const submitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newOrder = {
            ingredients: [  burgerData.bun._id, 
                            ...burgerData.ingredients.map(ingredient => ingredient._id), 
                            burgerData.bun._id ] 
        }
        try {
            let res = await api.post('orders', newOrder);
            let resData = res.data;
            if (resData.success && resData.order.number !== 0) {
                setOrderData({ name: resData.name, number: resData.order.number });
                openModal('Order');
            } else {
                throw new Error('Некорректные данные');
            }
        } catch (error) {
            setError(true);
            console.log('Ошибка: ', error); 
        } finally {
            setIsLoading(false);
        }
    };

	// >>>>>>> 

    return (
        <section className={classContainer}>
            <ul className={classConstructor}>
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
                            {burgerData.ingredients.map(ingredients => (
                                <li className={classIngredient} key={uuidv4()}>
                                    <DragIcon type="primary"/>
                                    <ConstructorElement text={ingredients.name}
                                                        price={ingredients.price}
                                                        thumbnail={ingredients.image}
                                                        extraClass={burgerData.ingredients.length < 6  ? classMR : null}                                              
                                    />
                                </li>
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
                        {state.total}
                    </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button     htmlType="button" 
                            type="primary" 
                            size="large"
                            disabled={burgerData.bun === null ? true : burgerData.ingredients.length === 0 ? true : false}
                            onClick={(e) => {
                                submitOrder(e)
                            }}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    openModal:  PropTypes.func.isRequired,
};