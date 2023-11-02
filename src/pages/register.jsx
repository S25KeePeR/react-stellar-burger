// react >>>>>>>
import { useState } from "react";
import { Link } from 'react-router-dom';

// page elements >>>>>>>
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

// page styles >>>>>>>
import styles from "./form-styles.module.css";

export default function Register() {

	// const >>>>>>>
    const [valueName, setValueName] = useState('')
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')
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
                Регистрация
            </h5>
            <Input
                type={'text'}
                placeholder={'name'}
                onChange={e => setValueName(e.target.value)}
                value={valueName}
                extraClass={classInput}
            />
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
                Зарегистрироваться
            </Button>
            <div className={classInfo}>
                <p className={classText}>
                    Уже зарегистрированы? 
                </p>
                <Link   to={`/login`}
                        className={classLink}>
                    Войти
                </Link>
            </div>
		</form>
  	);
}