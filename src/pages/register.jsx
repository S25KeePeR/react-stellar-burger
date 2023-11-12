// react >>>>>>>
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// project modules >>>>>>>
import { register } from "../services/actions/user-action";

// page elements >>>>>>>
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

// page styles >>>>>>>
import * as styles from "./form-styles";

export default function RegisterPage() {

	// const >>>>>>>
    const [valueName, setValueName] = useState('')
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const inputRef = useRef(null)

    // function >>>>>>>
    const submitRegister = (e) => {
        e.preventDefault();
        dispatch(register(valueName, valueEmail, valuePassword))
            .then(() => {
                navigate('/login', { replace: true });
            });
    };

	// styles >>>>>>>

	// >>>>>>> 
  	return (
		<form className={styles.classContainer}>
            <h5 className={styles.classTitle}>
                Регистрация
            </h5>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setValueName(e.target.value)}
                value={valueName}
                extraClass={styles.classInput}
            />
            <EmailInput
                onChange={e => setValueEmail(e.target.value)}
                value={valueEmail}
                name={'email'}
                isIcon={false}
                extraClass={styles.classInput}
            />
            <PasswordInput
                onChange={e => setValuePassword(e.target.value)}
                value={valuePassword}
                name={'password'}
                extraClass={styles.classInput}
                // ref={inputRef}
            />
            <Button     htmlType="submit" 
                        type="primary" 
                        size="medium"
                        extraClass={styles.classButton}
                        disabled={ !valueName ? true : !valueEmail ? true : !valuePassword ? true : false }
                        onClick={(e) => {
                            submitRegister(e)
                        }}
            >
                Зарегистрироваться
            </Button>
            <div className={styles.classInfo}>
                <p className={styles.classText}>
                    Уже зарегистрированы? 
                </p>
                <Link   to={`/login`}
                        className={styles.classLink}>
                    Войти
                </Link>
            </div>
		</form>
  	);
}