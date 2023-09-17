import React from "react";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types";

import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({data, openModal}) {

    const ingredientsCategories = React.useMemo(() => ({
        buns: data.filter(items => items.type === "bun"),
        mains: data.filter(items => items.type !== "bun")
    }), [data]);

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
                    <ConstructorElement type="top"
                                        isLocked={true}
                                        text={`${ingredientsCategories.buns[0].name} (верх)`}
                                        price={ingredientsCategories.buns[0].price}
                                        thumbnail={ingredientsCategories.buns[0].image}
                    />
                </li>
                <li>
                    <ul className={classIngredients}>
                        {ingredientsCategories.mains.map(ingredients => (
                            <li className={classIngredient} key={ingredients._id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={ingredients.name}
                                                    price={ingredients.price}
                                                    thumbnail={ingredients.image}
                                />
                            </li>
                        ))}
                    </ul>
                </li>
                <li className={classBun}>
                    <ConstructorElement type="bottom"
                                        isLocked={true}
                                        text={`${ingredientsCategories.buns[0].name} (низ)`}
                                        price={ingredientsCategories.buns[0].price}
                                        thumbnail={ingredientsCategories.buns[0].image}
                    />
                </li>
            </ul>
            <div className={classFooter}>
                <div className={classTotal}>
                    <span className={classTotalTitle}>610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button     htmlType="button" 
                            type="primary" 
                            size="large" 
                            onClick={() => {
                                openModal('Order')
                            }}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
};