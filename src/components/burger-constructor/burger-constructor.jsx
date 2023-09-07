import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";

export default function BurgerConstructor() {

    const classContainer = `${styles.container}`;
    const classConstructor = `mt-20 pt-5 mb-5 pl-4 ${styles.constructor}`;
    const classBun = `ml-8`;
    const classIngredients = `pr-1 ${styles.ingredients} custom-scroll`;
    const classIngredient = `${styles.ingredient}`;
    const classFooter = `mr-4 mt-5 ${styles.footer}`;
    const classTotal = `mr-10 ${styles.total}`;
    const classTotalTitle = `mr-4 text text_type_digits-medium`;

    return (
        <section className={classContainer}>
            <ul className={classConstructor}>
                <li className={classBun}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                </li>
                <li>
                    <ul className={classIngredients}>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                        <li className={classIngredient}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={data[3].image}
                            />
                        </li>
                    </ul>
                </li>
                <li className={classBun}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                </li>
            </ul>
            <div className={classFooter}>
                <div className={classTotal}>
                    <span className={classTotalTitle}>610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" >
                    Оформить заказ
                </Button>
            </div>



        </section>
    );
};
