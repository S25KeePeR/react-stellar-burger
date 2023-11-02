// react >>>>>>>
import { useState } from "react";
import { Link } from 'react-router-dom';

// page elements >>>>>>>
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

// page styles >>>>>>>
import styles from "./form-styles.module.css";

export default function ResetPassword() {

	// const >>>>>>>
    const [valueName, setValueName] = useState('')
    const [valuePassword, setValuePassword] = useState('')

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
                Восстановление пароля
            </h5>
            <PasswordInput
                onChange={e => setValuePassword(e.target.value)}
                value={valuePassword}
                name={'password'}
                placeholder={'Введите новый пароль'}
                extraClass={classInput}
                // ref={inputRef}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setValueName(e.target.value)}
                value={valueName}
                extraClass={classInput}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={classButton}
            >
                Сохранить
            </Button>
            <div className={classInfo}>
                <p className={classText}>
                    Вспомнили пароль?
                </p>
                <Link   to={`/login`}
                        className={classLink}>
                    Войти
                </Link>
            </div>
		</form>
  	);
}