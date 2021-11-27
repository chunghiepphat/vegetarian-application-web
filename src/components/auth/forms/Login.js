import React, {useContext, useState} from "react";
import {authDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {Link, useHistory} from "react-router-dom";
import LoginGoogle from "./login/LoginGoogle";
import LoginEmail from "./login/LoginEmail";
import LoginFacebook from "./login/LoginFacebook";

const Login = ({background}) => {
    const history = useHistory();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext))

    return (
        <div className="auth-section">
            <h1>{authDisplayStrings.loginWelcome}</h1>
            <p>{authDisplayStrings.loginSignUp} <Link to={{
                pathname: "/auth/register",
            }}>{authDisplayStrings.loginSignUpLink}</Link></p>
            {/*Social authentication*/}
            <h2>{authDisplayStrings.loginSocial}</h2>
            <LoginFacebook history={history} background={background} setIsLoggingIn={setIsLoggingIn}/>
            <LoginGoogle history={history} background={background} setIsLoggingIn={setIsLoggingIn}/>
            {/*Email authentication*/}
            <h2>{authDisplayStrings.loginEmail}</h2>
            <LoginEmail history={history} background={background} setIsLoggingIn={setIsLoggingIn}/>
        </div>
    )
}
export default Login;