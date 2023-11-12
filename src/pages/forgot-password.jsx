// react >>>>>>>
import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// project modules >>>>>>>
import { forgotPassword } from "../services/actions/user-action";

// page elements >>>>>>>
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInput } from "../hooks/useInput";

// page styles >>>>>>>
import * as styles from "./form-styles";

export default function ForgotPasswordPage() {

	// const >>>>>>>
    const { values, onChange, setValues } = useInput({email: ''});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function >>>>>>>
    const submitForgot = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(values.email))
            .then(() => {
                navigate('/reset-password', { replace: true });
            }
        );
    };


	// styles >>>>>>>

	// >>>>>>> 
  	return (
		<form className={styles.classContainer}>
            <h5 className={styles.classTitle}>
                Восстановление пароля
            </h5>
            <EmailInput
                onChange={onChange}
                value={values.email}
                name={'email'}
                isIcon={false}
                extraClass={styles.classInput}  
                required={true}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={styles.classButton}
                        onClick={(e) => {submitForgot(e)}}
                        disabled={!values.email ? true : false}
            >
                Восстановить
            </Button>
            <div className={styles.classInfo}>
                <p className={styles.classText}>
                    Вспомнили пароль?
                </p>
                <Link   to={`/login`}
                        className={styles.classLink}>
                    Войти
                </Link>
            </div>
		</form>
  	);
}