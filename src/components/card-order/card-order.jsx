// react >>>>>>>
import { useSelector} from 'react-redux';

// project modules >>>>>>>
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// page elements >>>>>>>
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; 

// modals elements >>>>>>>

// page styles >>>>>>>
import styles from "./card-order.module.css";

export default function CardOrder({order, user=false}) { 

	// const >>>>>>>
	const numberIngredients = order.ingredients.length;
	const ingredients = order.ingredients;
	const { base } = useSelector(state => state.ingredientsReducer);

	// function >>>>>>>
	const orderDate = (dateFromServer) => {
		// const dateFromServer = '2023-11-16T17:33:32.877Z'
		return <FormattedDate date={new Date(dateFromServer)} />
	}
	const getIngredientImage = (id) => {
		return base.find(item => item._id === id).image
	}
	const getPrice = () => {
		const total = ingredients.map((id) => {
			return base.find(item => item._id === id).price
		})
		const price = total.reduce((sum, i) => {
			return sum + i
		})
		return price 
	}
	const getStatus = () => {
		if (order.status == 'pending') {
			return 'Готовится'
		}
		if (order.status == 'created') {
			return 'Создан'
		}
		return 'Выполнен'
	}


	const counts = {};
	ingredients.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

	const getElement = (item, index, arr) => {
		if (index < 6 ) { 
			return (
				<li key={item} className={classItem} style={{ zIndex: `${6 -index}` }}>
					<span  key={item} className={classItemImg} 
							style={{ backgroundImage: `url(${getIngredientImage(item)})`}}
					>
						{ index == 5 && 
							<span className={classItemText}>
								{`+${arr.length - 5}`}
							</span>
						}
					</span>
				</li>
			)
		}
	}


	// styles >>>>>>>
	const classOrder = `p-6 ${styles.order}`;   
    const classTitle = `text text_type_main-medium`;
    const classText = `text text_type_main-default`;
    const classNumOrder = `text text_type_digits-default`;
    const classDate = `${classText} text_color_inactive`; 
    const classHeader = `${styles.header}`;
    const classFooter = `${styles.footer}`;
    const classPriceContainer = `${styles.flex}`;
    const classPrice = `mr-2 text text_type_digits-default `;
    const classItems = `${styles.items}`;
    const classItem = `${styles.item}`;
    const classItemImg = `${styles.img}`;
    const classItemText = `${styles.text} text text_type_main-default`;
	const classStatus = `${classText} ${styles.done}`;

	// >>>>>>> 
    return (

		<li className={classOrder}>
			<div className={classHeader}>
				<p className={classNumOrder}>
					#{String(order.number).padStart(6, '0')}
				</p>
				<p className={classDate}>
					{orderDate(order.createdAt)}
				</p>
			</div>
			<h2 className={classTitle}>
				{order.name}
			</h2>
			{ user && 
				<span className={order.status == 'done' ? classStatus : classText}>
					{getStatus()}
				</span>
			}
			<div className={classFooter}>
				<ul className={classItems}>
					{Object.keys(counts).map(( item, index, arr ) => (
						getElement(item, index, arr )
					))}
				</ul>
				<div className={classPriceContainer}>
					<p className={classPrice}>
						{getPrice()} 
					</p>
					<CurrencyIcon type="primary"/>
				</div>

			</div>
		</li>
    )
}; 


// propTypes >>>>>>>
// CardOrder.propTypes = {
//     order:  PropTypes.arrayOf.isRequired,
// };