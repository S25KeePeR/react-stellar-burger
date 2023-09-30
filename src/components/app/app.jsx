import { useEffect, useState, useReducer } from "react";
import api from "../../utils/api";

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

export default function App() {

	// const >>>>>>>
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(false);
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
    const [ state, dispatch ] = useReducer(constructorReducer, initialState);
		
	// function >>>>>>>

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
			try {
				let res = await api.get('ingredients');
				let resData = res.data;
				if (resData.success && Array.isArray(resData.data) && resData.data.length !== 0) {
					setData(resData.data);
				} else {
					throw new Error('Некорректные данные или пустая база');
				}
			} catch (error) {
				setError(true);
				console.log('Ошибка: ', error); 
			} finally {
				setIsLoading(false);
			}
		};
		getData();
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
				{isLoading && 
					<p className={classStatus}>
						Загрузка...
					</p>
				}
				{error && 
					<p className={classStatus}>
						Произошла ошибка
					</p>
				}
				{data.length !== 0 && 
					<ConstructorContext.Provider value={{burgerData, setBurgerData, state, dispatch}}>
						<BurgerIngredients data={data} openModal={openModal}/> 
						<OrderDetailsContext.Provider value={{setOrderData, setIsLoading, setError}}>
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


