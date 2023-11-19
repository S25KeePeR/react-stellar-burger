// react >>>>>>>
import { useSelector } from 'react-redux';
import { useMemo }  from "react";
import { useDrag } from "react-dnd";
import { useLocation, Link } from 'react-router-dom';


// page elements >>>>>>>
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// page styles >>>>>>>
import styles from "./card-ingredients.module.css";

export default function CardIngredients({ingredient, openModal, id}) { 

    const location = useLocation();
    const ingredientId = ingredient._id;

	// function >>>>>>>
    const [{ isDrag }, dragRef] = useDrag(() => ({
        type: 'BOX',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
      }))

      const { bun, ingredients } = useSelector(store => store.constructorReducer);

      const counter = useMemo(
        () => () => {
            return bun && bun._id === ingredient._id ? 2 : ingredients.filter((item) => item._id === ingredient._id).length;
        },
        [ingredient._id, bun, ingredients]
    );

    // styles >>>>>>>
    const classItem = `ml-4 mr-2 ${styles.item}`;
    const classItemTitle = `text text_type_main-default ${styles.title}`;
    const classItemText = `text text_type_digits-default ${styles.text}`;
    const classItemPrice = `${styles.price}`;
    const classLink = `${styles.link}`;

	// >>>>>>> 
    return (
        <Link
            key={ingredientId} 
            to={`/ingredients/${ingredientId}`} 
            state={{ background: location }} 
            className={classLink}
        >
            <li     className={classItem}
                    ref={dragRef}
                    key={id} 
                    onClick={() => {
                        openModal('ingredient', ingredient);
                    }}                
                >
                { counter() > 0 && <Counter count={ counter() } size="default" extraClass="m-1"/> }
                <img src={ingredient.image} alt={ingredient.name} width="240" height="120"/>
                <div className={classItemPrice}>
                    <span className={classItemText}>{ingredient.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <span className={classItemTitle}>{ingredient.name}</span>
            </li>
        </Link>
    )

}





