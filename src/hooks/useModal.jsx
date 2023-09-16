import { useState, useCallback } from "react";

const useModal = ({action = false}) => {
    const [modalState, setModalState] = useState(false);

    const closeModal = () => {
        setModalState(false);
    }

    const openModal = () => {
        setModalState(true)
    }

    if (action === true) {
        openModal();
    } else {
        closeModal();
    }


    return {
        modalState
    };
};

export default useModal;