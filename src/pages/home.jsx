// react >>>>>>>
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// project modules >>>>>>>
import { getBase } from "../services/actions/ingredients-action";

// page elements >>>>>>>
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";

// modals elements >>>>>>>
import useModal from "../hooks/useModal";
import Modal from "../components/modals/modal";
import OrderDetails from "../components/modals/order-details/order-details";
import IngredientDetails from "../components/modals/ingredient-details/ingredient-details";

// page styles >>>>>>>
import styles from "./home.module.css";

export default function HomePage() { 

	// const >>>>>>>
	const dispatch = useDispatch();
	const { base, baseRequest, baseFailed } = useSelector(state => state.ingredientsReducer);
	const { modalState, modalType, openModal, closeModal } = useModal();

	// function >>>>>>>
	useEffect(() => {
		dispatch(getBase());
	}, []);

	// styles >>>>>>>
    const classContainer = `${styles.container} pl-5 pr-5 text text_type_main-large`;
	const classStatus = `${styles.status} text text_type_main-large`;

	// >>>>>>> 
    return (
        <section className={classContainer}>
            {baseRequest && 
                <p className={classStatus}>
                    Загрузка...
                </p>
            }
            {baseFailed && 
                <p className={classStatus}>
                    Произошла ошибка
                </p>
            }
            {!baseRequest && !baseFailed && base.length > 0 &&
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients openModal={openModal}/> 
                    <BurgerConstructor openModal={openModal}/>
                </DndProvider>
            }
            {modalState && modalType === 'ingredient' &&
				<Modal closeModal={closeModal} modalTitle={'Детали ингредиента'}>
					<IngredientDetails />
				</Modal>
			}
			{modalState && modalType === 'Order' &&
				<Modal closeModal={closeModal}>
					<OrderDetails />
				</Modal>
			}
        </section>
    )
};