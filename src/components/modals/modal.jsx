import { useEffect, forwardRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = forwardRef(({ closeModal, modalTitle = null, children }, ref) => {
    
    useEffect(() => {
        const closeModalOnPressKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
        document.addEventListener('keydown', closeModalOnPressKey);
        return () => document.removeEventListener('keydown', closeModalOnPressKey);
    }, [closeModal])

    const classModal = `pt-10 pl-10 pr-10 pb-15 ${styles.modal}`;
    const classHeader = ` ${styles.header}`;
    const classH2 = `text text_type_main-large mt-3 ${styles.title}`;
    const classCloseButton = ` ${styles.close}`;

    return ReactDOM.createPortal((
        <>
            <div ref={ref} className={classModal}>
                <div className={classHeader}>
                    <h2 className={classH2}>
                        {modalTitle}
                    </h2>
                    <button className={classCloseButton} type="button" onClick={closeModal}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={closeModal}/>
        </> 
    ), modalRoot);
});

Modal.propTypes = {
    modalTitle: PropTypes.string,
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;