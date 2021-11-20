import React from "react";

const Modal = ({onClose = () => {}, children}) => {

    return(
        <div className="modal"> 
            <div className="container-modal">
                <div className="content">{children}</div>
            </div>
        </div>
    )
};

export default Modal;