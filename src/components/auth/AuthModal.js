import React from "react";
import "./Auth.css";
import LocalizedStrings from "react-localization";
import {Link, Route, useHistory, withRouter} from "react-router-dom";
import {createPortal} from "react-dom";
import Login from "./forms/Login";

const AuthModal = ({background}) => {
    const history = useHistory();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            buttonClose: "Close",
            resetPasswordPrompt: "Forgot your password?",
            urlResetPassword: "Click here.",
        },
        vi: {
            buttonClose: "Hủy",
            resetPasswordPrompt: "Quên mật khẩu?",
            urlResetPassword: "Bấm vào đây.",
        }
    });
    // Handles closing modal
    const closeModal = e => {
        e.stopPropagation();
        history.push(background.pathname);
    };

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-container">
                <Route path="/login"><Login background={background.pathname}/></Route>
                <div className="auth-section">
                    <button className="button-light" onClick={closeModal}>{strings.buttonClose}</button>
                </div>
                <p>{strings.resetPasswordPrompt} <Link to={{
                    pathname: "/auth/account-recover",
                }}>{strings.urlResetPassword}</Link></p>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default withRouter(AuthModal);
