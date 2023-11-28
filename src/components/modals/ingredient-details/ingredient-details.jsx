import ingredientPropType from "../../../utils/prop-types";
import { useState } from "react";

import styles from "./ingredient-details.module.css";
import { useSelector } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";

const classContainer = `${styles.container}`;
const classH3 = `text text_type_main-medium mt-4 `;
const classH2 = `text text_type_main-large mt-3 ${styles.title}`;
const classDetails = `${styles.details} mt-8`;
const classItem = `${styles.item}`;
const classTextInactive = `text_color_inactive`;
const classTextMain = `text text_type_main-default ${classTextInactive}`;
const classTextDigits = `text text_type_digits-default ${classTextInactive} mt-2`;

// const IngredientDetails =  ({ingredient}) => {
// const IngredientDetails = ({ingredients = null}) => {
const IngredientDetails = () => {

    // const ingredient = useSelector(store => store.ingredientReducer.ingredient);

    const location = useLocation();
    const { ingredientId } = useParams();
    const { base } = useSelector(state => state.ingredientsReducer);
    const ingredient = base.find((item) => item._id === ingredientId )

    return (
        <div className={classContainer}>
            <h2 className={classH2} style={{ justifyContent: location.state === null ? 'center' : 'flex-start'}}>
                Детали ингредиента
            </h2>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <h3 className={classH3}>{ingredient.name}</h3>
            <ul className={classDetails}>
                <li className={classItem}>
                    <p className={classTextMain}>Калории,ккал</p>
                    <p className={classTextDigits}>{ingredient.calories}</p>
                </li>
                <li className={classItem}>
                    <p className={classTextMain}>Белки, г</p>
                    <p className={classTextDigits}>{ingredient.proteins}</p>
                </li>
                <li className={classItem}>
                    <p className={classTextMain}>Жиры, г</p>
                    <p className={classTextDigits}>{ingredient.fat}</p>
                </li>
                <li className={classItem}>
                    <p className={classTextMain}>Углеводы, г</p>
                    <p className={classTextDigits}>{ingredient.carbohydrates}</p>
                </li>
            </ul> 
        </div>   
    );
};

// IngredientDetails.propTypes = {
//     ingredient: ingredientPropType
// };

export default IngredientDetails;
