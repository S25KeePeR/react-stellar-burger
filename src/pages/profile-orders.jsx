// react >>>>>>>
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';

// project modules >>>>>>>
import ProfileMenu from '../components/profile-menu/profile-menu';
import CardOrder from '../components/card-order/card-order';

// page elements >>>>>>>

// page styles >>>>>>>
import styles from "./profile.module.css";

export default function ProfileOrdersPage() { 

	// const >>>>>>>
    const { ordersUser, orderRequest, orderFailed } = useSelector(store => store.orderReducer);
    console.log(ordersUser)
    // const orders = ordersAll.orders
	// function >>>>>>>
   
	// styles >>>>>>>
    const classSection = `${styles.section}`;
    const classList = `mt-9 ${styles.list} custom-scroll`;
    const classTitle = `text text_type_main-medium`;

	// >>>>>>> 
    return (

        <section className={classSection}>
            <ProfileMenu />
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
                <ul className={classList}>
                    {/* {orders.map(item => (
                        <CardOrder key={item._id} order={item}/>
                    ))} */}
                    {/* <CardOrder />
                    <CardOrder />
                    <CardOrder />
                    <CardOrder />
                    <CardOrder />
                    <CardOrder />
                    <CardOrder /> */}
                </ul>
            }
        </section>
    )
};