// react >>>>>>>
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// pages >>>>>>>
import HomePage from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";

// page elements >>>>>>>
import AppHeader from "../app-header/app-header";
import Modal from "../modals/modal";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";

// page styles >>>>>>>
import styles from "./app.module.css";

export default function App() {

	// const >>>>>>>
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	// function >>>>>>>
	useEffect(() => {
		// dispatch(getBase());
	}, []);

	const handleModalClose = () => {
		// Возвращаемся к предыдущему пути при закрытии модалки
		navigate(-1);
	};

	// styles >>>>>>>
  	const classMain = `${styles.main} pl-5 pr-5 mb-10 text_type_main-large`;

	// >>>>>>> 
  	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={classMain}>
			
				<Routes>
					<Route path="/" element={<HomePage/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="/forgot-password" element={<ForgotPassword/>} />
					<Route path="/reset-password" element={<ResetPassword/>} />
					
				</Routes>
				{background && (
					<Routes>
						<Route
							path='/ingredients/:ingredientId'
							element={
								<Modal onClose={handleModalClose}>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</div>
  	);
}


