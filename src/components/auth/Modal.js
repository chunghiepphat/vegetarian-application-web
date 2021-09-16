import React from "react";
import "./Modal.css";
import {createPortal} from "react-dom";
import Login from "./Login";
import {Route, useHistory, withRouter} from "react-router-dom";
import Register from "./Register";

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
