// react >>>>>>>

// project modules >>>>>>>

// page elements >>>>>>>

// modals elements >>>>>>>

// page styles >>>>>>>
import styles from "./not-found.module.css";

export default function NotFoundPage() { 

	// const >>>>>>>

	// function >>>>>>>

	// styles >>>>>>>
    const classContainer = `${styles.container} `;
    const classTitle = `text text_type_digits-large`;
    const classText = `text text_type_main-large`;

	// >>>>>>> 
    return (
        <section className={classContainer}> 
            <h1 className={classTitle}>
                404
            </h1>
            <span className={classText}>
                Страница не найдена
            </span>

        </section>

    )
};