import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../../services/actions/ingredients-action";

import api from "../../utils/api";

// import transitions from "../modals/modal-transitions.module.css"; 
// import { CSSTransition } from "react-transition-group";

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
	// const nodeRef = useRef(null);
	const { modalState, modalType, openModal, closeModal } = useModal();

	// function >>>>>>>
	useEffect(() => {
        const getBase = () => {
            return async function(dispatch) {
                dispatch({
                    type: GET_INGREDIENTS
                })
                try {
                    let res = await api.get('ingredients');
                    let resData = res.data;
                    if (res && resData.success && Array.isArray(resData.data) && resData.data.length !== 0) {
                        dispatch({
                            type: GET_INGREDIENTS_SUCCESS,
                            base: resData
                        })

                    } else {
                        dispatch({
                            type: GET_INGREDIENTS_FAILED
                        })
                        throw new Error('Некорректные данные или пустая база');
                    }
                } catch (error) {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                    console.log(error); 
                }
                
            }
        } 
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
					<>
						<BurgerIngredients openModal={openModal}/> 
						<BurgerConstructor openModal={openModal}/>
					</>
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


