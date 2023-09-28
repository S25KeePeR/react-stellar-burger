import { useEffect, useState, useReducer, useMemo, useRef } from "react";

import styles from "./app.module.css";
// import transitions from "../modals/modal-transitions.module.css"; 
// import { CSSTransition } from "react-transition-group";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import useModal from '../../hooks/useModal';
import Modal from "../modals/modal";
import OrderDetails from "../modals/order-details/order-details";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";

import { ConstructorContext } from "../../services/constructorContext";
import { constructorReducer, initialState } from "../../services/constructorReducer";
import { OrderDetailsContext } from "../../services/orderDetailsContext";

const dataURL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {

	// const >>>>>>>
	const [ dataState, setDataState ] = useState({ 
		isLoading: false,
		hasError: false,
		data: []
	});
	const [ burgerData, setBurgerData ] = useState({
		bun: null,
		ingredients: [],
	});
	const [ orderData, setOrderData ] = useState({
		name: null,
		number: null
	})
		
	// const nodeRef = useRef(null);
	const { modalState, modalType, modalData, openModal, closeModal } = useModal();
	const { isLoading, hasError, data } = dataState;
    const [ state, dispatch ] = useReducer(constructorReducer, initialState);
		
	// function >>>>>>>
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
	
	// class >>>>>>>
  	const classMain = `${styles.main} pl-5 pr-5 mb-10 text_type_main-large`;
	
	// >>>>>>> 
  	return (
		<>
		<div className={styles.app}>
			<AppHeader />
			<main className={classMain}>

				{isLoading && "Загрузка..."}
				{hasError && "Произошла ошибка"}
				{!isLoading && !hasError && data.length !== 0 && 
					<ConstructorContext.Provider value={{burgerData, setBurgerData, state, dispatch}}>
						<BurgerIngredients data={data} openModal={openModal}/> 
						<OrderDetailsContext.Provider value={{setOrderData}}>
							<BurgerConstructor openModal={openModal}/>						
						</OrderDetailsContext.Provider> 
					</ConstructorContext.Provider>
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
				<OrderDetails  orderNum={orderData.number}/>
			</Modal>
		}
		{/* <CSSTransition
			nodeRef={nodeRef}
			in={modalState && modalType === 'ingredient'}
			timeout={300}
			classNames={{...transitions}}
			unmountOnExit 
		>
			<Modal ref={nodeRef} closeModal={closeModal} modalTitle={'Детали ингредиента'}>
				<IngredientDetails  ingredient={modalData}/>
			</Modal>
      	</CSSTransition> */}
		</>
  	);
}


