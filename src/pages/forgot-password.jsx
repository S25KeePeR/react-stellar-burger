// react >>>>>>>
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// project modules >>>>>>>


// page elements >>>>>>>
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

// page styles >>>>>>>
import styles from "./form-styles.module.css";

export default function ForgotPassword() {

	// const >>>>>>>
    const [valueEmail, setValueEmail] = useState('')
    const dispatch = useDispatch();

    // function >>>>>>>
    const submitForgot = (e) => {
        e.preventDefault();
        dispatch('getOrder(listID)');
    };

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
                Восстановление пароля
            </h5>
            <EmailInput
                onChange={e => setValueEmail(e.target.value)}
                value={valueEmail}
                name={'Укажите e-mail'}
                isIcon={false}
                extraClass={classInput}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={classButton}
                        onClick={(e) => {
                            submitForgot(e)
                        }}
            >
                Восстановить
            </Button>
            <div className={classInfo}>
                <p className={classText}>
                    Вспомнили пароль?
                </p>
                <Link   to={`/login`}
                        className={classLink}>
                    Войти
                </Link>
                <Link   to={`/reset-password`}
                        className={classLink}>
                    ResetPassword
                </Link>
            </div>
		</form>
  	);
}