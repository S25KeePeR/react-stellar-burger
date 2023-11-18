// react >>>>>>>
import { useDispatch, useSelector } from 'react-redux';

// project modules >>>>>>>
import CardOrder from '../components/card-order/card-order';

// page elements >>>>>>>

// modals elements >>>>>>>

// page styles >>>>>>>
import styles from "./feed.module.css";

export default function FeedPage() { 

	// const >>>>>>>
	const dispatch = useDispatch();
    const { ordersAll, orderRequest, orderFailed } = useSelector(store => store.orderReducer);
    const total = ordersAll.total
    const totalToday = ordersAll.totalToday
    const orders = ordersAll.orders

  
	// function >>>>>>>


	// styles >>>>>>> ${styles.border}
    const classSection = `${styles.section}  `;
    const classOrders = `mt-10 ${styles.orders} `;
    const classStatistics = `mt-25 ${styles.statistics}`;
    const classList = ` ${styles.list} custom-scroll`;
    const classH1 = ` text text_type_main-large`;
    const classTitle = `text text_type_main-medium`;
    const classText = `text text_type_main-default`;
    const classItems = `${styles.items}`;
    const classItem = `mt-2 text text_type_digits-default`;
    const classTotal = `text text_type_digits-large`;
    const classItemEnd = `${classItem} ${styles.end}`;
    const classBox = `${styles.box}`;
    const classContainer = `${styles.container}`;

	// >>>>>>>  
    return (
        <section className={classSection}>
            {orderRequest && 
                <p className={classTitle}>
                    Загрузка...
                </p>
            }
            {orderFailed && 
                <p className={classTitle}>
                    Произошла ошибка
                </p>
            }
            {!orderRequest && !orderFailed && 

                <>
                    <div className={classOrders}>
                        <h1 className={classH1}>
                            Лента заказов
                        </h1>
                        <ul className={classList}>
                            {orders.map(item => (
                                <CardOrder key={item._id} order={item}/>
                            ))}
                        </ul>
                    </div>
                    <div className={classStatistics}>
                        <div className={classContainer}>
                            <div className={classBox}>
                                <h3 className={classTitle}>
                                    Готовы:
                                </h3>
                                <ul className={classItems}>
                                    <li className={classItemEnd}>
                                        034533
                                    </li>
                                    <li className={classItemEnd}>
                                        034532
                                    </li>
                                    <li className={classItemEnd}>
                                        034530
                                    </li>
                                    <li className={classItemEnd}>
                                        034527
                                    </li>
                                    <li className={classItemEnd}>
                                        034525
                                    </li>
                                </ul>
                            </div>
                            <div className={classBox}>
                                <h3 className={classTitle}>
                                    В работе:
                                </h3>
                                <ul className={classItems}>
                                    <li className={classItem}>
                                        034538
                                    </li>
                                    <li className={classItem}>
                                        034541
                                    </li>
                                    <li className={classItem}>
                                        034542
                                    </li>
                                    <li className={classItem}>
                                        034542
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className={classTitle}>
                                Выполнено за все время:
                            </h3>
                            <span  className={classTotal}>
                                { total.toLocaleString() }
                            </span>
                        </div>
                        <div>
                            <h3 className={classTitle}>
                                Выполнено за сегодня:
                            </h3>
                            <span  className={classTotal}>
                                { totalToday }
                            </span>
                        </div>
                    </div>
                </>
            }
        </section>

    )
}; 