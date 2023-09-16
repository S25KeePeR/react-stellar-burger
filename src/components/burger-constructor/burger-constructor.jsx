import React from "react";

import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details/order-details";
// import useModal from "../../hooks/useModal"

export default function BurgerConstructor({data}) {

    const [modalState, setModalState] = React.useState(false);

    function closeModal() {
        setModalState(false);
    }

    const classContainer = `${styles.container}`;
    const classConstructor = `mt-20 pt-5 mb-5 pl-4 ${styles.constructor}`;
    const classBun = `ml-8`;
    const classIngredients = `pr-1 ${styles.ingredients} custom-scroll`;
    const classIngredient = `${styles.ingredient}`;
    const classFooter = `mr-4 mt-5 ${styles.footer}`;
    const classTotal = `mr-10 ${styles.total}`;
    const classTotalTitle = `mr-4 text text_type_digits-medium`;


    const buns = React.useMemo(() => data.filter(items => items.type === "bun"), [data]);
    const mains = React.useMemo(() => data.filter(items => items.type !== "bun"), [data]);
   
    // const getIngredient = (props) => {
    //     if (props.__v !== 0) {
    //         return <li className={classIngredient} key={props._id}>
    //             <DragIcon type="primary"/>
    //             <ConstructorElement
    //                 text={props.name}
    //                 price={props.price}
    //                 thumbnail={props.image}
    //             />
    //         </li>
    //     }
    // };


    return (
        <section className={classContainer}>
            <ul className={classConstructor}>
                <li className={classBun}>
                    <ConstructorElement type="top"
                                        isLocked={true}
                                        text={`${buns[0].name} (верх)`}
                                        price={buns[0].price}
                                        thumbnail={buns[0].image}
                    />
                </li>
                <li>
                    <ul className={classIngredients}>
                        {mains.map(ingredients => (
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
                                        text={`${buns[0].name} (низ)`}
                                        price={buns[0].price}
                                        thumbnail={buns[0].image}
                    />
                </li>
            </ul>
            <div className={classFooter}>
                <div className={classTotal}>
                    <span className={classTotalTitle}>610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setModalState(true)}>
                    Оформить заказ
                </Button>
            </div>

			{modalState && 
                <Modal closeModal={closeModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    );
};
