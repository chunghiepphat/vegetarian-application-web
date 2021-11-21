import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import LoginGoogle from "./login/LoginGoogle";
import LoginEmail from "./login/LoginEmail";
import LoginFacebook from "./login/LoginFacebook";
import LocalizedStrings from "react-localization";

const Login = ({background}) => {
    const history = useHistory();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            welcome: "Welcome back",
            signUpPrompt: "Don't have an account?",
            signUpUrl: "Sign up!",
            socialLoginHeader: "Continue with your social media",
            emailLoginHeader: "Sign in with your email",
        },
        vi: {
            welcome: "Xin chào!",
            signUpPrompt: "Không có tài khoản?",
            urlSignUp: "Đăng ký!",
            socialLoginHeader: "Tiếp tục bằng mạng xã hội",
            emailLoginHeader: "Đăng nhập bằng email",
        }
    });

    return (
        <div className="auth-section">
            <h1>{strings.welcome}</h1>
            <p>{strings.signUpPrompt} <Link to={{
                pathname: "/auth/register",
            }}>{strings.urlSignUp}</Link></p>
            {/*Social authentication*/}
            <h2>{strings.socialLoginHeader}</h2>
            <LoginFacebook history={history} background={background} setIsLoggingIn={setIsLoggingIn}/>
            <LoginGoogle history={history} background={background} setIsLoggingIn={setIsLoggingIn}/>
            {/*Email authentication*/}
            <h2>{strings.emailLoginHeader}</h2>
            <LoginEmail history={history} background={background} setIsLoggingIn={setIsLoggingIn}/>
        </div>
    )
}
export default Login;