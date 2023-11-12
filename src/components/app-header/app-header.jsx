import styles from "./app-header.module.css";

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export default function AppHeader() {

	// const >>>>>>>
    const typeIcon = {
        pr: "primary", 
        se: "secondary"
    };

	// function >>>>>>>
    const setActiveText = ({ isActive }) => ( isActive ? classLinkActive : classLink );
    const setActiveBurger = ({ isActive }) => {
        const type = isActive ? typeIcon.pr : typeIcon.se;
        return (
            <>
                <BurgerIcon type={type}/>
                <span >
                    Конструктор
                </span>
            </>
        )
    }
    const setActiveList = ({ isActive }) => {
        const type = isActive ? typeIcon.pr : typeIcon.se;
        return (
            <>
                <ListIcon type={type}/>
                <span >
                    Лента заказов
                </span>
            </>
        )
    }
    const setActiveProfile = ({ isActive }) => {
        const type = isActive ? typeIcon.pr : typeIcon.se;
        return (
            <>
                <ProfileIcon type={type}/>
                <span >
                    Личный кабинет
                </span>
            </>
        )
    }

	// styles >>>>>>>
    const classLogo = `${styles.logoImage}`;
    const classHeader = `mt-10 ml-10 mr-10 ${styles.header}`;
    const classItems = `${styles.navigation}`;
    const classItem = `mr-2 pb-4 pt-4 pl-5 pr-5 ${styles.item}`;
    const classLink = `text text_type_main-default ${styles.link}`;
    const classLinkActive = `${classLink} ${styles.ative}`;

	// >>>>>>> 
    return (
        <header className={classHeader}>
            <ul className={classItems}>
                <li className={classLogo}>
                    <Logo />
                </li>
                <li className={classItem}>
                    <NavLink    to={`/`}
                                className={setActiveText}
                                children={setActiveBurger}
                    /> 
                </li>
                <li className={classItem}>
                    <NavLink    to={`/feed`}
                                className={setActiveText}
                                children={setActiveList}
                    />
                </li>
                <li className={classItem}>
                    <NavLink    to={`/profile`}
                                className={setActiveText}
                                children={setActiveProfile}
                    />
                </li>
            </ul>
        </header>
    );
};