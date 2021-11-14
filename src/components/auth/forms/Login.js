import React from "react";
import {Link, useHistory} from "react-router-dom";
import LoginGoogle from "./login/LoginGoogle";
import LoginEmail from "./login/LoginEmail";
import LoginFacebook from "./login/LoginFacebook";

const Login = ({background}) => {
    const history = useHistory();

    // Renders the form
    return (
        <div className="auth-section">
            <h1>Welcome back!</h1>
            <p>Don't have an account? <Link to={{
                pathname: "/auth/register",
            }}>Sign up!</Link></p>
            {/*Social authentication*/}
            <h2>Continue with your social media</h2>
            <LoginFacebook history={history} background={background}/>
            <LoginGoogle history={history} background={background}/>
            {/*Email authentication*/}
            <h2>Sign in with your email</h2>
            <LoginEmail history={history} background={background}/>
        </div>
    )
}
export default Login;