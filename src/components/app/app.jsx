import {useEffect, useState } from "react";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import useModal from '../../hooks/useModal';
import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";

// import {data as base} from "../../utils/data"; // удалить

const dataURL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {

	const [dataState, setDataState] = useState({ 
		isLoading: false,
		hasError: false,
		data: []
	})

	const {modalState, modalType, modalData, openModal, closeModal} = useModal();
	const { isLoading, hasError, data } = dataState;

	useEffect(() => {
		const getData = async () => {
			try {
				let res = await fetch(dataURL);
				if (!res.ok) {
					throw new Error('Ошибка соединения с сервером');
				}
				res = await res.json();
				if (res.success && Array.isArray(res.data) && res.data.length !== 0) {
					setDataState({ ...dataState, isLoading: false, data: res.data })
				} else {
					throw new Error('Некорректные данные или пустая база');
				}
			} catch (error) {
				setDataState({ ...dataState, hasError: true, isLoading: false  })
				console.log('Ошибка: ', error); 
			} 
		};
		getData();
	}, []);

  	const classMain = `${styles.main} pl-5 pr-5 mb-10 text_type_main-large`;

  	return (
		<>
		<div className={styles.app}>
			<AppHeader />
			<main className={classMain}>

				{isLoading && "Загрузка..."}
				{hasError && "Произошла ошибка"}
				{!isLoading && !hasError && data.length !== 0 && 
				<> 
					<BurgerIngredients data={data} openModal={openModal}/> 
					<BurgerConstructor data={data} openModal={openModal}/>
				</>
				}
			</main>
		</div>
		{modalState && modalType === 'ingredient' &&
			<Modal closeModal={closeModal} modalTitle={'Детали ингредиента'}>
				<IngredientDetails ingredient={modalData}/>
			</Modal>
		}
		{modalState && modalType === 'Order' &&
			<Modal closeModal={closeModal}>
				<OrderDetails/>
			</Modal>
		}
		</>
  	);
}
