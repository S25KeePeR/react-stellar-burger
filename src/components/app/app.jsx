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
import FeedDetails from "../modals/feed-details/feed-details";
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
	const { base, baseRequest, baseFailed } = useSelector(state => state.ingredientsReducer);

	// function >>>>>>>
	useEffect(() => {
		dispatch(getBase());
	}, []);
	
	useEffect(() => {
		if ( token ) {
			dispatch(checkUserAuth());
		}
	  }, [token, refreshToken]);

	const handleModalClose = () => {
		navigate(-1);
	};

	// styles >>>>>>>
  	const classMain = `${styles.main}`;
	const classStatus = `text text_type_main-large ${styles.status}`;
	// >>>>>>> 
  	return (
		<div className={styles.app}>
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
					<AppHeader />
					<main className={classMain}>
						<Routes location={background || location}>
							{/* для всех */}
							<Route path="/" element={<HomePage/>} />
							<Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
							<Route path="*" element={<NotFoundPage/>} />
							<Route path="/feed" element={<FeedPage/>} />
							<Route path="/feed/:number" element={<FeedDetails/>} />
							
							{/* Только для авторизированных пользователей OnlyAuth */}
							<Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} />
							<Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrdersPage/>} />} />
							<Route path="/profile/orders/:number" element={<OnlyAuth component={<FeedDetails/>} />} />

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
										<Modal closeModal={handleModalClose} >
											<IngredientDetails />
										</Modal>
									}
								/>
								<Route
									path='/feed/:id'
									element={
										<Modal closeModal={handleModalClose} >
											<FeedDetails />
										</Modal>
									}
								/>
								<Route
									path='/profile/orders/:id'
									element={
										<Modal closeModal={handleModalClose} >
											<FeedDetails />
										</Modal>
									}
								/>
							</Routes>
						)}
					</main>
				</>
			}
		</div>
  	);
}


