import React, {useState} from "react";
import "./Auth.css";
import Login from "./forms/Login";
import Register from "./forms/Register";
import {createPortal} from "react-dom";
import {Route, useHistory, withRouter} from "react-router-dom";

const AuthModal = () => {
    const history = useHistory();
    const [display, setDisplay] = useState();

    const closeModal = e => {
        e.stopPropagation();
        history.goBack();
    };

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-container">
                <Route path="/login"><Login/></Route>
                <div className="auth-section">
                    <button className="button-cancel" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default withRouter(AuthModal);
