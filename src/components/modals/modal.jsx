import { useEffect, forwardRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = forwardRef(({ closeModal, children }, ref) => {
    
    useEffect(() => {
        const closeModalOnPressKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
        document.addEventListener('keydown', closeModalOnPressKey);
        return () => document.removeEventListener('keydown', closeModalOnPressKey);
    }, [closeModal])

    const classModal = `p-10 ${styles.modal}`;
    const classCloseButton = ` ${styles.close}`;

    return ReactDOM.createPortal((
        <>
            <div ref={ref} className={classModal}>
                <button className={classCloseButton} type="button" onClick={closeModal}>
                    <CloseIcon type="primary"/>
                </button>

                {children}
            </div>
            <ModalOverlay onClick={closeModal}/>
        </> 
    ), modalRoot);
});

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;


{/* <div className={classHeader}>
<h2 className={classH2}>
    {modalTitle}
</h2>
<button className={classCloseButton} type="button" onClick={closeModal}>
    <CloseIcon type="primary"/>
</button>
</div> */}