// react >>>>>>>
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// page styles >>>>>>>
import styles from "./profile-menu.module.css";
import { logOut } from '../../services/actions/user-action';

export default function ProfileMenu() {

	// const >>>>>>>
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refreshToken = localStorage.getItem("refreshToken");

	// function >>>>>>>
    const setActiveText = ({ isActive }) => ( isActive ? classLinkActive : classLink );
     const onClickLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
    };


	// styles >>>>>>>
    const classMenu = `${styles.menu}`;
    const classTextInfo = `mt-20 text text_type_main-default text_color_inactive ${styles.info}`;
    const classLink = `text text_type_main-medium text_color_inactive ${styles.link}`;
    const classLinkActive = `${classLink} ${styles.active}`;

	// >>>>>>>  to={`/login`}
    return (
        <nav className={classMenu}>
            <NavLink    to={`/profile`}
                        className={setActiveText}
                        end
            >
                Профиль
            </NavLink>
            <NavLink    to={`/profile/orders`}
                        className={setActiveText}
                        end
            >
                История заказов
            </NavLink>
            <Link    
                    className={classLink}
                    onClick={onClickLogout}
            >
                Выход
            </Link>
            <span className={classTextInfo}>
                В этом разделе вы можете
                изменить свои персональные данные
            </span>
        </nav>

    )
}