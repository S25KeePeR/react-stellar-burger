import {useEffect, useState } from "react";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";

import {data as base} from "../../utils/data"; // удалить

const dataURL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {

	const [dataState, setDataState] = useState({ 
		isLoading: false,
		hasError: false,
		data: []
	})

    const [openModal, setOpenModal] = useState(false);

    function closeModal() {
        setOpenModal(false);
    }


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


  	const { isLoading, hasError, data } = dataState;

  	const classMain = `${styles.main} pl-5 pr-5 mb-10 text_type_main-large`;

  	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={classMain}>

				{isLoading && "Загрузка..."}
				{hasError && "Произошла ошибка"}
				{!isLoading && !hasError && data.length !== 0 && 
				<> 
					<BurgerIngredients data={data} /> 
					<BurgerConstructor data={data} />
				</>
				}
			</main>
		</div>
  	);
}
