// react >>>>>>>
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// pages >>>>>>>
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import ProfileOrdersPage from "../../pages/profile-orders";
import NotFoundPage from "../../pages/not-found";
import FeedPage from "../../pages/feed";

// project modules >>>>>>>
import { getBase } from "../../services/actions/ingredients-action";
import { checkUserAuth } from "../../services/actions/user-action";

// page elements >>>>>>>
import AppHeader from "../app-header/app-header";
import Modal from "../modals/modal";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";

// page styles >>>>>>>
import styles from "./app.module.css";

export default function App() {

	// const >>>>>>>
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const token = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');

	const background = location.state && location.state.background;

	////////////////////////////////
	const { userName, isUserAuth } = useSelector(state => state.userReducer);
	// console.log(`${userName} >> ${isUserAuth}`);
	// console.log(token);
	// console.log(refreshToken);
	// // console.log(user);
	// console.log(!!background);
	///////////////////////////////
	
	// function >>>>>>>
	useEffect(() => {
		// dispatch(getBase());
	}, []);
	useEffect(() => {
		if ( token ) {
			dispatch(checkUserAuth());
		}
	  }, [token, refreshToken]);

	const handleModalClose = () => {
		// Возвращаемся к предыдущему пути при закрытии модалки
		navigate(-1);
	};

	// styles >>>>>>>
  	const classMain = `${styles.main}`;

	// >>>>>>> 
  	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={classMain}>
				<Routes>
					{/* для всех */}
					<Route path="/" element={<HomePage/>} />
					<Route path="*" element={<NotFoundPage/>} />
					
					{/* Только для авторизированных пользователей OnlyAuth */}
					<Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} />
					<Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrdersPage/>} />} />
					<Route path="/feed" element={<OnlyAuth component={<FeedPage/>} />} />

					{/* Только для неавторизированных пользователей OnlyUnAuth */}
					<Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
					<Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
					<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>} />} />
					<Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>} />} />
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


