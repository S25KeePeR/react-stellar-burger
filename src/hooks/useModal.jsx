import { useState } from "react";

const useModal = () => {
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState({});

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
        modalData,
        closeModal,
        openModal
    };
};

export default useModal;