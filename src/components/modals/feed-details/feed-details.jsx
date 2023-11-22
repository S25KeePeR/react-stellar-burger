import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { GET_CLEAR } from '../../../services/actions/order-action';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { getOrderDetails } from '../../../services/actions/order-action';

import styles from "./feed-details.module.css";
	
const FeedDetails = () => { 

	// const >>>>>>>
	const dispatch = useDispatch();
	const location = useLocation();

	let { number } = useParams();
	if ( number === undefined ) {
		const pathname = location.pathname;
		number = pathname.slice(pathname.lastIndexOf('/') + 1);
	};

	const { details, orderRequest } = useSelector(store => store.orderReducer);
	const { base } = useSelector(state => state.ingredientsReducer);
	const order = details[0]

	// function >>>>>>>
    useEffect(() => {
        dispatch(getOrderDetails(number));
		return () => {
            dispatch({ type: GET_CLEAR });
        }
    }, []);

	const getPrice = () => {
		const priceArr = order.ingredients.map((id) => {
			return base.find(item => item._id === id).price
		})
		const price = priceArr.reduce((sum, i) => {
			return sum + i
		})
		return price 
	}

	const getIngredientImage = (id) => {
		return base.find(item => item._id === id).image
	}
	const getIngredientName = (id) => {
		return base.find(item => item._id === id).name
	}
	const getIngredientPrice = (id) => {
		return base.find(item => item._id === id).price
	}

	const ingredients = (ingredientsID) => {

		let counts = {};
		ingredientsID.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

		return (
			<ul className={classItems}>
				{Object.keys(counts).map(( item ) => (
					<li key={item} className={classItem}>
						<div className={classItemImgBox} >
							<span  className={classItemImg} 
									style={{ backgroundImage: `url(${getIngredientImage(item)})`}}
							>
							</span>
						</div>
						<span className={classItemText}>
							{getIngredientName(item)}
						</span>
						<div style={{ display: 'flex'}}>
							<span className={classPrice}>
								{counts[item]} x {getIngredientPrice(item)}
							</span>
							<CurrencyIcon type="primary"/>
						</div>
					</li>
				))}
			</ul>
		)
	}

	// styles >>>>>>>
	const classText = `text text_type_main-default`;
	const classContainer = `${styles.container}`;
	const classHeader = `text text_type_digits-default ${styles.header}`;
	const classTitle = `text text_type_main-medium mt-5 ${styles.title}`;
	const classStatus = `${classText} ${styles.status}`;
	const classStructure = `text text_type_main-medium mt-15 ${styles.structure}`;
	const classItems = `${styles.items} custom-scroll`;
	const classItem = `pr-5 ${styles.item}`;
	const classDate = `${classText} text_color_inactive`;
	const classItemImgBox = `${styles.box}`;
	const classItemImg = `${styles.img}`;
	const classItemText = `ml-4 ${classText} ${styles.text}`;
	const classPrice = `mr-2 text text_type_digits-default `;
	const classFooter = ` mt-10 ${styles.footer}`;
	

	return (
		<>
            { orderRequest && 
                <p className={classStatus}>
                    Загрузка...
                </p>
            }
            { !orderRequest && details.length !== 0 &&
				<div className={classContainer}>
					<header className={classHeader}>
					#{String( number ).padStart(6, '0')}
					</header>
					<h2 className={classTitle}>
						{order.name}
					</h2>
					<span className={order.status === 'done' ? classStatus : classText}>
						{order.status === 'pending' ? 'Готовится' : order.status == 'created' ? 'Создан' : 'Выполнен' }
					</span>
					<span className={classStructure}>
						Состав:
					</span>
						{ingredients(order.ingredients)}
					<footer className={classFooter}>
					<FormattedDate className={classDate} date={new Date(order.createdAt)} />
					<div style={{ display: 'flex'}}>
						<span className={classPrice}>
							{getPrice()} 
						</span>
						<CurrencyIcon type="primary"/>
					</div>
					</footer>
				</div>
            }
		</>
	);
};

// IngredientDetails.propTypes = {
//     ingredient: ingredientPropType
// };

export default FeedDetails;