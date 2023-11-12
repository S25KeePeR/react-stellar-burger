// react >>>>>>>
import { useState, useEffect  } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// project modules >>>>>>>
import { resetPassword } from "../services/actions/user-action";

// page elements >>>>>>>
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInput } from "../hooks/useInput";

// page styles >>>>>>>
import * as styles from "./form-styles";

export default function ResetPasswordPage() {

	// const >>>>>>>
    const isForgotPassword = localStorage.getItem('forgotPassword');
    const { values, onChange, setValues } = useInput({ password: '', code: ''});
console.log( values.code)
    const [valueToken, setValueToken] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function >>>>>>>
    useEffect(() => {
        if (!isForgotPassword) { navigate("*") } 
    }, []);
    const submitReset = (e) => {
        e.preventDefault();
        dispatch(resetPassword( values.password, values.code ))
            .then(() => {
                navigate('/login', { replace: true });
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
            <PasswordInput
                onChange={onChange}
                value={values.password}
                name={'password'}
                placeholder={'Введите новый пароль'}
                extraClass={styles.classInput}
                // ref={inputRef}
            />
            <Input
                type={'text'}
                name={'code'}
                placeholder={'Введите код из письма'}
                onChange={onChange}
                value={values.code}
                extraClass={styles.classInput}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={styles.classButton}
                        onClick={(e) => {
                            submitReset(e)
                        }}
                        disabled={ !values.password ? true : !values.code ? true : false }
            >
                Сохранить
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