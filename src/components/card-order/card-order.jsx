// react >>>>>>>
import { useSelector} from 'react-redux';

// project modules >>>>>>>
import PropTypes from "prop-types";

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
	const classStatus = ``;

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
				<span className={classText}>
					Создан
				</span>
			}
			<div className={classFooter}>
				<ul className={classItems}>
					<li  className={classItem} style={{ zIndex: 6 }}>
						<span   className={classItemImg} 
								style={{ backgroundImage: `url(${getIngredientImage(ingredients[0])})`}}
						>
						</span>
					</li>
					{numberIngredients >= 2 && 
						<li  className={classItem} style={{ zIndex: 5 }}>
							<span   className={classItemImg} 
									style={{ backgroundImage: `url(${getIngredientImage(ingredients[1])})`}} 
							>
							</span>
						</li>
					}
					{numberIngredients >= 3 && 
						<li  className={classItem} style={{ zIndex: 4 }}>
							<span   className={classItemImg} 
									style={{ backgroundImage: `url(${getIngredientImage(ingredients[2])})`}}
							>
							</span>
						</li>
					}
					{numberIngredients >= 4 && 
						<li  className={classItem} style={{ zIndex: 3 }}>
							<span   className={classItemImg} 
									style={{ backgroundImage: `url(${getIngredientImage(ingredients[3])})`}}
							>
							</span>
						</li>
					}
					{numberIngredients >= 5 && 
						<li  className={classItem} style={{ zIndex: 2 }}>
							<span   className={classItemImg} 
									style={{ backgroundImage: `url(${getIngredientImage(ingredients[4])})`}}
							>
							</span>
						</li>
					}
					{numberIngredients >= 6 && 
						<li  className={classItem} style={{ zIndex: 1 }}>
							<span   className={classItemImg} 
									style={{ backgroundImage: `url(${getIngredientImage(ingredients[5])})`}}
							>
								{numberIngredients > 6 && 
									<span className={classItemText}>
										+{numberIngredients - 6}
									</span>
								}
							</span>
						</li>
					}	
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