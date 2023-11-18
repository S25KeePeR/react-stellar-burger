import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useLocation, Link } from 'react-router-dom';

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

    const showCounter = (num) => {
        if (num > 0) { 
            return <Counter count={num} size="default" extraClass="m-1"/>
        }
    };

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
            to={`/ingredients/${ingredientId}`} // Тут мы формируем динамический путь для нашего ингредиента
            state={{ background: location }} // а также сохраняем в свойство background роут, на котором была открыта наша модалка
            className={classLink}
        >
            <li     className={classItem}
                    ref={dragRef}
                    key={id} 
                    onClick={() => {
                        openModal('ingredient', ingredient);
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
        </Link>
    )

}





