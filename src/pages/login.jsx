// react >>>>>>>
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// project modules >>>>>>>
import { logIn } from "../services/actions/user-action";

// page elements >>>>>>>
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInput } from "../hooks/useInput";

// page styles >>>>>>>
import * as styles from "./form-styles";

export default function LoginPage() {

	// const >>>>>>>
    const { values, onChange, setValues } = useInput({email: '', password: ''});

    const dispatch = useDispatch();

    // function >>>>>>>
    const submitLogin = (e) => {
        e.preventDefault();
        dispatch(logIn( values.email, values.password));
    };

	// styles >>>>>>>

	// >>>>>>> 
  	return (
		<form className={styles.classContainer} onSubmit={submitLogin} >
            <h5 className={styles.classTitle}>
                Вход
            </h5>
            <EmailInput
                onChange={onChange}
                value={values.email}
                name={'email'}
                isIcon={false}
                extraClass={styles.classInput}
                required={true}
            />
            <PasswordInput
                onChange={onChange}
                value={values.password}
                name={'password'}
                extraClass={styles.classInput}
                required={true}
                // ref={inputRef}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={styles.classButton}
                        disabled={ !values.email ? true : !values.password ? true : false }
            >
                Войти
            </Button>
            <div className={styles.classInfo}>
                <p className={styles.classText}>
                    Вы - новый пользователь? 
                </p>
                <Link   to={`/register`}
                        className={styles.classLink}>
                    Зарегистрироваться
                </Link>
                <p className={styles.classText}>
                    Забыли пароль?
                </p>
                <Link   to={`/forgot-password`}
                        className={styles.classLink}>
                    Восстановить пароль
                </Link>

            </div>
		</form>
  	);
}


