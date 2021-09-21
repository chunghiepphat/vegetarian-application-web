import React from "react";
import "./Modal.css";
import Login from "./forms/Login";
import Register from "./forms/Register";
import {createPortal} from "react-dom";
import {Route, useHistory, withRouter} from "react-router-dom";

const Modal = () => {
    const history = useHistory();

    const closeModal = e => {
        e.stopPropagation();
        history.goBack();
    };

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-container">
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <div className="modal-content">
                    <button className="button-cancel" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default withRouter(Modal);
