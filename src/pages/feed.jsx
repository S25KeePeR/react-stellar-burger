// react >>>>>>>
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

// project modules >>>>>>>
import CardOrder from '../components/card-order/card-order';

// page elements >>>>>>>
import { connect, disconnect } from "../services/actions/orders-all-action";

// page styles >>>>>>>
import styles from "./feed.module.css";

export default function FeedPage() { 

	// const >>>>>>>
	const dispatch = useDispatch();
    const location = useLocation();
    const ORDERS_ALL_URL = "wss://norma.nomoreparties.space/orders/all";
    const { orders, isLoading, connected, total, totalToday } = useSelector(store => store.ordersAllReducer);
    const panding = orders.filter(item => item.status == 'pending' )
    const done = orders.filter(item => item.status == 'done' )

	// function >>>>>>>
    useEffect(() => {
        dispatch(connect(ORDERS_ALL_URL), { replace: true });
        return () => {
            dispatch(disconnect(ORDERS_ALL_URL), { replace: true });
        }
    }, [dispatch]);

	// styles >>>>>>> 
    const classSection = `${styles.section}  `;
    const classOrders = `mt-10 ${styles.orders} `;
    const classStatistics = `mt-25 ${styles.statistics}`;
    const classList = ` ${styles.list} custom-scroll`;
    const classH1 = ` text text_type_main-large`;
    const classTitle = `text text_type_main-medium ${styles.title}`;
    const classText = `text text_type_main-default`;
    const classItems = `${styles.items}`;
    const classItem = `mb-2 text text_type_digits-default`;
    const classTotal = `text text_type_digits-large`;
    const classItemEnd = `${classItem} ${styles.end}`;
    const classBox = `${styles.box}`;
    const classContainer = `${styles.container}`;
    const classLink = `${styles.link}`;

	// >>>>>>>  
    return (
        <section className={classSection}>
            { isLoading && 
                <p className={classTitle}>
                    Загрузка...
                </p>
            }
            { !isLoading && !connected && 
                <p className={classTitle}>
                    Произошла ошибка
                </p>
            }
            { !isLoading && connected  && 

                <>
                    <div className={classOrders}>
                        <h1 className={classH1}>
                            Лента заказов
                        </h1>
                        <ul className={classList}>
                            {orders.map(item => (
                                <Link
                                    key={item.number} 
                                    to={`/feed/${item.number}`} 
                                    state={{ background: location }} 
                                    className={classLink}
                                >
                                    <CardOrder key={item._id} order={item} />
                                </Link>
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
                                    {done.map((item, index) => {
                                        if ( index < 20) {
                                            return (
                                                <li key={item.number} className={classItemEnd}>
                                                    {String(item.number).padStart(6, '0')}
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className={classBox}>
                                <h3 className={classTitle}>
                                    В работе:
                                </h3>
                                <ul className={classItems}>
                                    {panding.map((item, index) => {
                                        if ( index < 20) {
                                            return (
                                                <li key={item.number} className={classItem}>
                                                    {String(item.number).padStart(6, '0')}
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className={classTitle}>
                                Выполнено за все время:
                            </h3>
                            <span  className={classTotal}>
                                { total > 0 && total.toLocaleString("ru") }
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

/// http://localhost:3000/feed/26737