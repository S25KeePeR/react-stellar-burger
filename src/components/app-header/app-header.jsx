import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {

    const typeIcon = {
        pr: "primary", 
        se: "secondary"
    };

    const classHeader = `mt-10 ml-10 mr-10 ${styles.header}`;
    const classMenuItem = `mr-2 pb-4 pt-4 pl-5 pr-5 ${styles.navigation__item}`;
    const classLink = `text text_type_main-default ${styles.link}`;
    const classLinkText = `ml-2 ${classLink} ${styles.link__text}`;
    const classLinkTextActive = `ml-2 ${classLink} ${styles.link__text_ative}`;

    return (
        <header className={classHeader}>
            <ul className={styles.navigation}>
                <li className={styles.logoImage}>
                    <Logo />
                </li>
                <li className={classMenuItem}>
                    <a href="##" className={classLink}>
                        <BurgerIcon type={typeIcon.pr}/>
                        <span className={classLinkTextActive}>
                            Конструктор
                        </span>
                    </a>
                </li>
                <li className={classMenuItem}>
                    <a href="##" className={classLink}>
                        <ListIcon type={typeIcon.se}/>
                        <span className={classLinkText}>
                            Лента заказов
                        </span>
                    </a>
                </li>
                <li className={classMenuItem}>
                    <a href="##" className={classLink}>
                        <ProfileIcon type={typeIcon.se}/>
                        <p className={classLinkText}>
                            Личный кабинет
                        </p>
                    </a>
                </li>
            </ul>
        </header>
    );
};
