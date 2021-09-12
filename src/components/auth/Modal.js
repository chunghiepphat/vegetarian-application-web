import React from "react";
import "./Modal.css";
import {createPortal} from "react-dom";
import Login from "./Login";

const Modal = () => {
    return createPortal(
        <div className="modal-container">
            <Login/>
        </div>,
        document.getElementById("modal-root")
    )
}

export default Modal;
