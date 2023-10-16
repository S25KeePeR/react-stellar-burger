import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { getBase } from "../../services/actions/ingredients-action";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import useModal from '../../hooks/useModal';
import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";

import styles from "./app.module.css";

export default function App() {

	// const >>>>>>>
	const dispatch = useDispatch();
	const { base, baseRequest, baseFailed } = useSelector(state => state.ingredientsReducer);
	const { modalState, modalType, openModal, closeModal } = useModal();

	// function >>>>>>>
	useEffect(() => {
		dispatch(getBase());
	}, []);

	// class >>>>>>>
  	const classMain = `${styles.main} pl-5 pr-5 mb-10 text_type_main-large`;
	const classStatus = `${styles.status}`;

	// >>>>>>> 
  	return (
		<>
			<div className={styles.app}>
				<AppHeader />
				<main className={classMain}>
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
				</main>
			</div>
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
		</>
  	);
}


