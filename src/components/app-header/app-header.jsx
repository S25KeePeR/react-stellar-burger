import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {

    const typeIcon = {
        pr: "primary", 
        se: "secondary"
    };

    const classHeader = `mt-10 ml-10 mr-10 ${styles.header}`;
    const classMenuItem = `mr-2 pb-4 pt-4 pl-5 pr-5 ${styles.navigation__item}`;
    const classLink = `text text_type_main-default ml-2`;
    const classLinkText = `${classLink} ${styles.link__text}`;
    const classLinkTextActive = `${classLink} ${styles.link__text_ative}`;

    return (
        <header className={classHeader}>
            <ul className={styles.navigation}>
                <li className={styles.logoImage}>
                    <Logo />
                </li>
                <li className={classMenuItem}>
                    <BurgerIcon type={typeIcon.pr}/>
                    <p className={classLinkTextActive}>
                        Конструктор
                    </p>
                </li>
                <li className={classMenuItem}>
                    <ListIcon type={typeIcon.se}/>
                    <p className={classLinkText}>
                        Лента заказов
                    </p>
                </li>
                <li className={classMenuItem}>
                    <ProfileIcon type={typeIcon.se}/>
                    <p className={classLinkText}>
                        Личный кабинет
                    </p>
                </li>
            </ul>
        </header>
    );
};
