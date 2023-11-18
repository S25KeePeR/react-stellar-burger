// react >>>>>>>
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

// project modules >>>>>>>
import ProfileMenu from '../components/profile-menu/profile-menu';
import { editUserData } from "../services/actions/user-action";

// page elements >>>>>>>
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInput } from "../hooks/useInput";

// page styles >>>>>>>
import styles from "./profile.module.css";

export default function ProfilePage() { 

	// const >>>>>>>
    const dispatch = useDispatch();
    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    
    const { userName, userEmail } = useSelector(state => state.userReducer);

    const valueDefault = {
        name: userName, 
        email: userEmail, 
        password: '*****'
    }
    const { values, onChange, setValues } = useInput(valueDefault);
 
    const iconEdit = 'EditIcon';
    const iconClose ='CloseIcon';

    const [ inputName, setInputName ] = useState(true);
    const [ inputEmail, setInputEmail ] = useState(true);
    const [ inputPassword, setInputPassword ] = useState(true);

    // function >>>>>>>
    useEffect(() => {
		inputNameRef.current.focus();
	}, [inputName]);

    useEffect(() => {
		inputEmailRef.current.focus();
	}, [inputEmail]);

    useEffect(() => {
		inputPasswordRef.current.focus();
	}, [inputPassword]);

    const editName = () => {
        if (inputName) {
            setInputName(false)
        } else {
            setInputName(true)
            setValues({...values, name: userName})
        }
    }

    const editEmail = () => {
        if (inputEmail) {
            setInputEmail(false)
        } else {
            setInputEmail(true)
            setValues({...values, email: userEmail})
        }
    }

    const editPassword = () => {
        if (inputPassword) {
            setInputPassword(false)
            setValues({...values, password: ''})
            inputPasswordRef.current.focus();
        } else {
            setInputPassword(true)
            setValues({...values, password: valueDefault.password})
        }
    }

    const submitChange = (e) => {
        e.preventDefault(); 
        const newPassword = values.password == valueDefault.password ? null : values.password;
        dispatch(editUserData( values.name, values.email, newPassword));
        setInputName(true);
        setInputEmail(true);
        setInputPassword(true);

    }

    const canselChange = () => {
        setValues(valueDefault);
        setInputName(true);
        setInputEmail(true);
        setInputPassword(true);
    }



    const isDisabled = () => {
        if ( !inputName && values.name != userName  ) {
            return false
        }
        if ( !inputEmail && values.email != userEmail ) {
            return false
        }
        if ( !inputPassword && !values.password == '' ) {
            return false
        }
        return true
    }

	// styles >>>>>>>
    const classSection = `${styles.section}`;
    const classEdit = `${styles.edit}`;
    const classInput = `mb-6`;
    const classButtons = `${styles.buttons}`;  

	// >>>>>>> 
    return (
        <section className={classSection}>
            <ProfileMenu />
            <form className={classEdit} onSubmit={submitChange}>
                <Input
                    type={ 'text' }
                    name={ 'name' }
                    placeholder={ 'Имя' }
                    ref={ inputNameRef }
                    extraClass={ classInput }
                    icon={ inputName ? iconEdit : iconClose }
                    value={ values.name }
                    disabled={ inputName }
                    onChange={ onChange }
                    onIconClick={ editName }
                />
                <Input
                    type={ 'email' }
                    name={ 'email' }
                    placeholder={ 'Логин' }
                    ref={ inputEmailRef }
                    extraClass={ classInput }
                    icon={ inputEmail ? iconEdit : iconClose }
                    value={ values.email }
                    disabled={ inputEmail }
                    onChange={ onChange }
                    onIconClick={ editEmail }
                />
                <Input
                    type={ 'password' }
                    name={ 'password' }
                    placeholder={ 'Пароль' }
                    ref={ inputPasswordRef }
                    extraClass={ classInput }
                    icon={ inputPassword ? iconEdit : iconClose }
                    value={ values.password }
                    disabled={ inputPassword }
                    onChange={ onChange }
                    onIconClick={ editPassword }
                />
                { !inputName || !inputEmail || !inputPassword ?
                    <div className={classButtons}>
                    <Button     htmlType="button" 
                                type="secondary" 
                                size="medium" 
                                onClick={canselChange}                         
                    >
                        Отмена
                    </Button>
                    <Button     htmlType="submit" 
                                type="primary" 
                                size="medium" 
                                disabled={ isDisabled() }
                    >
                        Сохранить
                    </Button>
                    </div>
                    : <></>
                }
            </form>

        </section>
    )
};