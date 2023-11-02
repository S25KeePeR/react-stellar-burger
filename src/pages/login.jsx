// react >>>>>>>
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// page elements >>>>>>>
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// page styles >>>>>>>
import styles from "./form-styles.module.css";

export default function Login() {

	// const >>>>>>>
    const [valueEmail, setValueEmail] = useState('email')
    const [valuePassword, setValuePassword] = useState('password')
    // const inputRef = useRef(null)

    // function >>>>>>>

	// styles >>>>>>>
    const classContainer = `${styles.container}`;
    const classTitle = `${styles.title}`;
    const classInput = `mt-6`;
    const classButton = `mt-6 mb-20`;
    const classInfo = `${styles.info}`;
    const classText = ` text text_type_main-default text_color_inactive`;
    const classLink = ` text text_type_main-default ${styles.link}`;
	// >>>>>>> 
  	return (
		<form className={classContainer}>
            <h5 className={classTitle}>
                Вход
            </h5>
            <EmailInput
                onChange={e => setValueEmail(e.target.value)}
                value={valueEmail}
                name={'email'}
                isIcon={false}
                extraClass={classInput}
            />
            <PasswordInput
                onChange={e => setValuePassword(e.target.value)}
                value={valuePassword}
                name={'password'}
                extraClass={classInput}
                // ref={inputRef}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={classButton}
            >
                Войти
            </Button>
            <div className={classInfo}>
                <p className={classText}>
                    Вы - новый пользователь? 
                </p>
                <Link   to={`/register`}
                        className={classLink}>
                    Зарегистрироваться
                </Link>
                <p className={classText}>
                    Забыли пароль?
                </p>
                <Link   to={`/forgot-password`}
                        className={classLink}>
                    Восстановить пароль
                </Link>

            </div>
		</form>
  	);
}


