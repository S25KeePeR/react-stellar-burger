import { useRef }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";

import { DELETE_INGREDIENT } from "../../services/actions/constructor-action";
import { DELETE_VALUE } from '../../services/actions/ingredients-action';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './card-constructor.module.css';

export default function CardConstructor({ index, id, ingredient, moveIngredient}) { 

	// const >>>>>>>
    const dispatch = useDispatch();
    const burgerData = useSelector(store => store.constructorReducer);

	// function >>>>>>>
    const deleteIngredient = (item) => {
        dispatch({ type: DELETE_INGREDIENT, payload: item });
    };

    const [{ isDragging }, refDrag] = useDrag({
        type: 'CARD',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{ handlerId }, refDrop] = useDrop({
        accept: 'CARD',
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
              return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
              return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const ref = useRef(null);
    const dragDropRef = refDrag(refDrop(ref));


    // styles >>>>>>>
    // const classMR = ` ${styles.mr} `;
    const classIngredient = `${styles.ingredient}`;
    const classItem = ` ${styles.item}`;

	// >>>>>>> 
    return (
        <>
            { !isDragging && 
                <li className={classIngredient} key={ingredient.UID} id={ingredient.UID} ref={dragDropRef}>
                    <DragIcon type="primary"/>
                    <ConstructorElement text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        // extraClass={burgerData.ingredients.length < 6  ? classMR : null}
                                        handleClose={() => {
                                            deleteIngredient(ingredient)
                                        }}
                                        
                    />
                </li>
            }
            { isDragging &&
                <span className={classItem}></span>  
            }
                   
        </>

    )

}