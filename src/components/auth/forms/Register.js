import React, {useState} from "react";
import LocalizedStrings from "react-localization";
import {Link, useHistory, useLocation} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";

const Register = (props) => {
    const location = useLocation();
    const history = useHistory();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            welcome: "Welcome",
            signInPrompt: "Already have an account?",
            signInUrl: "Sign in!",
            registrationHeader: "Sign up with your email",
            firstName: "First name",
            lastName: "Last name",
            email: "Email address",
            password: "Enter password",
            confirmPassword: "Confirm password",
            buttonRegister: "Create new account",
            loadingMessage: "Creating your account...",
        },
        vi: {
            welcome: "Chào mừng",
            signInPrompt: "Bạn đã có tài khoản?",
            signInUrl: "Đăng nhập!",
            registrationHeader: "Đăng ký bằng email",
            firstName: "Tên",
            lastName: "Họ",
            email: "Email",
            password: "Mật khẩu",
            confirmPassword: "Xác nhận mật khẩu",
            buttonRegister: "Tạo tài khoản mới",
            loadingMessage: "Đang tạo tài khoản...",
        }
    });
    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles registration requests
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let responseMessage;
    const signUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request body
        let body = JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "email": props.email,
            "password": password
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/signup`;
        try {
            const response = await fetch(api, request)
            if (response.ok) {
                history.push("/auth/account-verify");
            } else if (response.status >= 400 && response.status < 600) {
                const error = await response.json();
                responseMessage = error.message;
                setIsLoading(false);
                if (responseMessage !== undefined) alert(responseMessage);
                else alert("An error has occurred. Status code: " + response.status);
            }
        } catch (error) {
            setIsLoading(false);
            alert("There was an unexpected error: " + error);
        }
    }

    // Renders the form
    return (
        <div className="auth-section">
            <h1>{strings.welcome}</h1>
            <p>{strings.signInPrompt} <Link to={{
                pathname: "/login",
                state: {background: location}
            }}>{strings.signInUrl}</Link></p>
            <h2>{strings.registrationHeader}</h2>
            <form className="auth-form" onSubmit={signUp}>
                <input type="text" placeholder={strings.firstName}
                       onChange={e => setFirstName(e.target.value)} required/>
                <input type="text" placeholder={strings.lastName}
                       onChange={e => setLastName(e.target.value)} required/>
                <input type="email" placeholder={strings.email}
                       onChange={e => props.setEmail(e.target.value)} required/>
                <input type="password" placeholder={strings.password}
                       onChange={e => setPassword(e.target.value)} required/>
                <input type="password" placeholder={strings.confirmPassword}/>
                {!isLoading ? <button type="submit" className="button-dark">{strings.buttonRegister}</button>
                    : <button disabled>{strings.loadingMessage}</button>}
            </form>
        </div>
    )
}

export default Register;