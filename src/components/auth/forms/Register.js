import React, {useContext, useEffect, useState} from "react";
import {genericStrings, requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {authDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link, useHistory, useLocation} from "react-router-dom";
import {profileDisplayStrings} from "../../../resources/UserDisplayStrings";

const Register = (props) => {
    const location = useLocation();
    const history = useHistory();

    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Validates input
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();
    const [isValid, setIsValid] = useState(false);
    let [message, setMessage] = useState("");
    const checkConfirmation = () => {
        if (password && confirmPassword) {
            if (password.length >= 8) {
                if (password === confirmPassword) {
                    setMessage(profileDisplayStrings.profilePasswordMatching);
                    setIsValid(true);
                } else {
                    setMessage(profileDisplayStrings.profilePasswordNotMatching);
                    setIsValid(false);
                }
            } else {
                setMessage(profileDisplayStrings.profilePasswordTooShort);
                setIsValid(false);
            }
        } else {
            setMessage("");
            setIsValid(false);
        }
    }
    useEffect(() => {
        checkConfirmation();
    }, [password, confirmPassword]);

    // Handles registration requests
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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
                else alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            setIsLoading(false);
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    // Renders the form
    return (
        <div className="auth__wrapper--full">
            <h1>{authDisplayStrings.registerWelcome}</h1>
            <p>{authDisplayStrings.registerSignIn} <Link to={{
                pathname: "/login",
                state: {background: location}
            }}>{authDisplayStrings.registerSignInLink}</Link></p>
            <h2>{authDisplayStrings.registerHeader}</h2>
            <form className="auth__form" onSubmit={signUp}>
                <label>{genericStrings.firstName}
                    <input type="text" placeholder={authDisplayStrings.registerFirstName}
                           onChange={e => setFirstName(e.target.value)} required/> </label>
                <label>{genericStrings.lastName}
                    <input type="text" placeholder={authDisplayStrings.registerLastName}
                           onChange={e => setLastName(e.target.value)} required/> </label>
                <label>{genericStrings.email}
                    <input type="email" placeholder={authDisplayStrings.registerEmail}
                           onChange={e => props.setEmail(e.target.value)} required/> </label>
                <label>{genericStrings.password}
                    <input type="password" placeholder={authDisplayStrings.registerNewPassword}
                           onChange={e => setPassword(e.target.value)} required/> </label>
                <label>{genericStrings.confirmPassword}
                    <input type="password" placeholder={authDisplayStrings.registerConfirmPassword}
                           onChange={e => setConfirmPassword(e.target.value)} required/> </label>
                <p className={isValid ? `text-positive` : `text-negative`}
                   style={{fontWeight: "600"}}>{message}</p>
                {!isLoading ?
                    <button type="submit" className="button-dark"
                            disabled={!isValid}>{authDisplayStrings.registerCreateAccount}</button>
                    : <button disabled>{authDisplayStrings.registerCreatingAccount}</button>}
            </form>
        </div>
    )
}

export default Register;