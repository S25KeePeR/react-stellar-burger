// react >>>>>>>
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

// project modules >>>>>>>
import ProfileMenu from '../components/profile-menu/profile-menu';
import CardOrder from "../components/card-order/card-order";

// page elements >>>>>>>
import { connect, disconnect } from "../services/actions/orders-user-action";

// page styles >>>>>>>
import styles from "./profile.module.css";

export default function ProfileOrdersPage() { 

	// const >>>>>>>
    const dispatch = useDispatch();
    const location = useLocation();

    const { orders, isLoading, error } = useSelector(store => store.ordersUserReducer);
    const sendToken = localStorage.getItem("accessToken").split('Bearer ')[1];
    const ORDERS_USER_URL = `wss://norma.nomoreparties.space/orders?token=${sendToken}`;

	// function >>>>>>>
    useEffect(() => {
        dispatch(connect(ORDERS_USER_URL));
        return () => {
            dispatch(disconnect(ORDERS_USER_URL));
        }
    }, [dispatch]);

	// styles >>>>>>>
    const classSection = `${styles.section}`;
    const classList = `mt-9 ${styles.list} custom-scroll`;
    const classTitle = `mt-30 text text_type_main-medium`;
    const classLink = `${styles.link}`;

	// >>>>>>> 
    return (

        <section className={classSection}>
            <ProfileMenu />
            { isLoading && 
                <p className={classTitle}>
                    Загрузка...
                </p>
            }
            { !isLoading && error && 
                <p className={classTitle}>
                    Произошла ошибка
                </p>
            }
            { !isLoading && !error && 
                <ul className={classList}>
                    { [...orders].reverse().map(item => (
                        <Link
                            key={item.number} 
                            to={`/profile/orders/${item.number}`} 
                            state={{ background: location }} 
                            className={classLink}
                        >
                            <CardOrder key={item._id} order={item} user={true}/>
                        </Link>
                    ))}
                </ul>
            }
        </section>
    )
};