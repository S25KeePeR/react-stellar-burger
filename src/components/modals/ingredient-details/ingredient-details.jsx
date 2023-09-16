import styles from "./ingredient-details.module.css";

const classH3 = `text text_type_main-medium mt-4 `;
const classDetails = `${styles.details} mt-8`;
const classItem = `${styles.item}`;
const classTextInactive = `text_color_inactive`;
const classTextMain = `text text_type_main-default ${classTextInactive}`;
const classTextDigits = `text text_type_digits-default ${classTextInactive} mt-2`;

const IngredientDetails = ({ingredient}) => {
    return (
        <>
           <img src={ingredient.image_large} alt={ingredient.name}/>
            <h3 className={classH3}>{ingredient.name}</h3>
            <ul className={classDetails}>
                <li className={classItem}>
                    <p className={classTextMain}>Калории,ккал</p>
                    <p className={classTextDigits}>{ingredient.calories}</p>
                </li>
                <li className={styles.item}>
                    <p className={classTextMain}>Белки, г</p>
                    <p className={classTextDigits}>{ingredient.proteins}</p>
                </li>
                <li className={styles.item}>
                    <p className={classTextMain}>Жиры, г</p>
                    <p className={classTextDigits}>{ingredient.fat}</p>
                </li>
                <li className={styles.item}>
                    <p className={classTextMain}>Углеводы, г</p>
                    <p className={classTextDigits}>{ingredient.carbohydrates}</p>
                </li>
            </ul> 
        </>
    );
};

export default IngredientDetails;
