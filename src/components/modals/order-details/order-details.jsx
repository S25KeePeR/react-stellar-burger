import { useSelector } from 'react-redux';

import styles from "./order-details.module.css";
import doneImg from "../../../images/submitted-order.svg";

const classH3 = `text text_type_digits-large mt-20`;
const classOrderID = `text text_type_main-medium mt-8 mb-15`;
const classOrderImg = `${styles.img}`;
const classText = `text text_type_main-default`;
const classInfo = `${classText} mt-15`;
const classInfoInactive = `${classText} text_color_inactive mt-2 pb-5 mb-15`;
const classLoading = `text text_type_main-medium mt-15 mb-15 `;

const OrderDetails = () => {

    const { order, orderRequest, orderFailed } = useSelector(store => store.orderReducer);
    
    return (
        <>
            { orderRequest && 
                <p className={classLoading}>
                    Загрузка...
                </p>
            }
            { orderFailed && 
                <p className={classLoading}>
                    Произошла ошибка
                </p>
            }
            { !orderRequest && !orderFailed && 
                <>
                    <h3 className={classH3}>{ order }</h3>
                    <p className={classOrderID}>идентификатор заказа</p>
                    <img className={classOrderImg} src={doneImg} alt='Заказ принят.' />
                    <p className={classInfo}>Ваш заказ начали готовить</p>
                    <p className={classInfoInactive}>Дождитесь готовности на орбитальной станции</p>
                </>
            }
        </>

    );
};

export default OrderDetails;