import { useState } from "react";
import { useDispatch } from 'react-redux';
import { CLEAR_INGREDIENT, SELECT_INGREDIENT } from "../services/actions/ingredient-action";

const useModal = () => {
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState(null);

    const closeModal = () => {
        setModalState(false);
        setModalType(null);
        dispatch({ type: CLEAR_INGREDIENT });
    }

    const openModal = (type = null, ingredient) => { 
        dispatch({ type: SELECT_INGREDIENT, payload: ingredient });
        setModalState(true);
        if (type !== null) {
            setModalType(type);
        }
    }
    
    return {
        modalState,
        modalType,
        closeModal,
        openModal
    };
};

export default useModal;