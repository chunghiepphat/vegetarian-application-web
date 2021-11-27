import React, {useContext} from "react";
import "./Auth.css";
import {authDisplayStrings} from "../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {Link, Route, useHistory, withRouter} from "react-router-dom";
import {createPortal} from "react-dom";
import Login from "./forms/Login";

const AuthModal = ({background}) => {
    const history = useHistory();

    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

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
                    <button className="button-light" onClick={closeModal}>{authDisplayStrings.loginClose}</button>
                </div>
                <p>{authDisplayStrings.loginResetPassword} <Link to={{
                    pathname: "/auth/account-recover",
                }}>{authDisplayStrings.loginResetPasswordLink}</Link></p>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default withRouter(AuthModal);
