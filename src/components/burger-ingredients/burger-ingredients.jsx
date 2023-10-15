import { useMemo, useRef }  from "react";
import { useSelector, useDispatch } from 'react-redux';

import { SELECT_TAB } from "../../services/actions/ingredients-action";

import PropTypes from "prop-types";

import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'; // { Tab , Counter, CurrencyIcon }
import ItemCard from "../item-card/item-card";

export default function BurgerIngredients({openModal}) {

    // const >>>>>>>
    const dispatch = useDispatch();
    const { base, currentTab } = useSelector(state => state.ingredientsReducer);
    const ingredientsCategories = useMemo(() => ({
        'Булки': base.filter(item => item.type === 'bun'),
        'Соусы': base.filter(item => item.type === 'sauce'),
        'Начинки': base.filter(item => item.type === 'main'),
    }), [base]);
    const tabsRef = useRef(null);
    const tabsRefs = {
        'Булки': useRef(null),
        'Соусы': useRef(null),
        'Начинки': useRef(null)
    }

    const handleScroll = () => {                                            
        const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;
        const bunsTop = tabsRefs['Булки'].current.getBoundingClientRect().top;
        const saucesTop = tabsRefs['Соусы'].current.getBoundingClientRect().top;
        const mainsTop = tabsRefs['Начинки'].current.getBoundingClientRect().top;

        const bunsDelta = Math.abs(bunsTop - tabsBottom);
        const soucesDelta = Math.abs(saucesTop - tabsBottom);
        const mainsDelta = Math.abs(mainsTop - tabsBottom);

        const min = Math.min(bunsDelta, soucesDelta, mainsDelta);

        const newTab = min === bunsDelta ? 'Булки' : min === soucesDelta ? 'Соусы' : 'Начинки';
        if (newTab !== currentTab) {
            dispatch({ type: SELECT_TAB, currentTab: newTab });
        }
    };
    const handleTabClick = (tab) => {
        tabsRefs[tab].current.scrollIntoView({behavior: 'smooth'});
    };

    // class >>>>>>>
    const classH1 = `mt-10 mb-5 text text_type_main-large `;
    const classH2 = `mb-6 text text_type_main-medium `;
    const classContainer = `mt-10 ${styles.container} custom-scroll`;
    const classItems = `mb-10 ${styles.items}`;
    
    // >>>>>>> 
    return (
        <section>
            <h1 className={classH1}>
                Соберите бургер
            </h1>
            <nav className={styles.menu} ref={tabsRef}>
                {Object.keys(ingredientsCategories).map(section => (
                    <Tab    key={section} 
                            value={section} 
                            active={currentTab === section} 
                            onClick={() => {
                                handleTabClick(section)
                            }}
                    >
                        {section}
                    </Tab>
                ))}
            </nav>
            <div className={classContainer} onScroll={handleScroll} >
                {Object.entries(ingredientsCategories).map(([category, ingredients]) => (
                    <div key={category} ref={tabsRefs[category]}>
                        <h2 className={classH2} >
                            {category}
                        </h2>
                        <ul className={classItems} >
                            {ingredients.map((ingredient) => (
                                <ItemCard   ingredient={ingredient}
                                            openModal={openModal}
                                            key={ingredient._id} 
                                />
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
    openModal:  PropTypes.func.isRequired,
};