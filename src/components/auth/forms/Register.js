import React, {useContext, useState} from "react";
import {authDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link, useHistory, useLocation} from "react-router-dom";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";

const Register = (props) => {
    const location = useLocation();
    const history = useHistory();

    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

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
            "registerEmail": props.registerEmail,
            "registerNewPassword": password
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
        <div className="auth-section">
            <h1>{authDisplayStrings.registerWelcome}</h1>
            <p>{authDisplayStrings.registerSignIn} <Link to={{
                pathname: "/login",
                state: {background: location}
            }}>{authDisplayStrings.registerSignInLink}</Link></p>
            <h2>{authDisplayStrings.registerHeader}</h2>
            <form className="auth-form" onSubmit={signUp}>
                <input type="text" placeholder={authDisplayStrings.registerFirstName}
                       onChange={e => setFirstName(e.target.value)} required/>
                <input type="text" placeholder={authDisplayStrings.registerLastName}
                       onChange={e => setLastName(e.target.value)} required/>
                <input type="email" placeholder={authDisplayStrings.registerEmail}
                       onChange={e => props.setEmail(e.target.value)} required/>
                <input type="password" placeholder={authDisplayStrings.registerNewPassword}
                       onChange={e => setPassword(e.target.value)} required/>
                <input type="password" placeholder={authDisplayStrings.registerConfirmPassword}/>
                {!isLoading ?
                    <button type="submit" className="button-dark">{authDisplayStrings.registerCreateAccount}</button>
                    : <button disabled>{authDisplayStrings.registerCreatingAccount}</button>}
            </form>
        </div>
    )
}

export default Register;