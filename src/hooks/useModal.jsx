import { useState } from "react";

const useModal = () => {
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState(null);

    const closeModal = () => {
        setModalState(false);
        setModalType(null);
    }

    const openModal = (type = null) => { 
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