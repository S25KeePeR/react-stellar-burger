import React, { useRef }  from "react";
import styles from "./burger-ingredients.module.css";
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import OpenModal from '../modals/modal';

export default function BurgerIngredients({data}) {
  
    const ingredientsCategories = React.useMemo(() => ({
        'Булки': data.filter(item => item.type === 'bun'),
        'Соусы': data.filter(item => item.type === 'sauce'),
        'Начинки': data.filter(item => item.type === 'main'),
    }), [data]);

    const [current, setCurrent] = React.useState(Object.keys(ingredientsCategories)[0]);

    const classH1 = `mt-10 mb-5 text text_type_main-large `;
    const classH2 = `mb-6 text text_type_main-medium `;
    const classContainer = `mt-10 ${styles.container} custom-scroll`;
    const classItems = `mb-10 ${styles.items}`;
    const classItem = `ml-4 mr-2 ${styles.item}`;
    const classItemTitle = `text text_type_main-default ${styles.title}`;
    const classItemText = `text text_type_digits-default ${styles.text}`;
    const classItemPrice = `${styles.price}`;
    
    const showCounter = (num) => {
        if (num > 0) { 
            return <Counter count={num} size="default" extraClass="m-1"/>
        }
    };

    const handleTabClick = (tab) => {
        console.log(tab);
    };

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
                            onClick={() => handleTabClick(section)}
                    >
                        {section}
                    </Tab>
                ))}
            </nav>
            <div className={classContainer}>
                {Object.entries(ingredientsCategories).map(([category, ingredients]) => (
                    <>
                        <h2 className={classH2} key={category}>
                            {category}
                        </h2>
                        <ul className={classItems}>
                            {ingredients.map((ingredient) => (
                                <li className={classItem} key={ingredient._id} 
                                    onClick={() => {
                                        console.log(ingredient.name)
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
                    </>
                ))}
            </div>
        </section>
    )

};
