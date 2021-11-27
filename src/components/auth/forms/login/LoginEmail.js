import React, {useContext, useState} from "react";
import {authDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {apiUrl} from "../../../../helpers/Variables";
import jwtDecode from "jwt-decode";

const LoginEmail = ({history, background}) => {
    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Input states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Handles login requests
    const signIn = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // Generates request body
        let body = JSON.stringify({
            "email": email,
            "password": password
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/signin`;
        await fetch(api, request)
            // Checks response, gets access token if green, throws error if not
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    setIsLoading(false);
                    alert("Invalid credentials.\nPlease check your email and password and try again.")
                } else if (response.status >= 400 && response.status < 600) {
                    const error = response.json();
                    let message = error.message;
                    setIsLoading(false);
                    if (message !== undefined) alert(message);
                    else alert("An unexpected error has occurred. Status code: " + response.status);
                }
            })
            // Saves result if response is green
            .then(result => {
                if (result) {
                    if (!result.message) {
                        localStorage.setItem("accessToken", JSON.stringify(result));
                        localStorage.setItem("userInfo", JSON.stringify(jwtDecode(JSON.stringify(result))));
                        history.push(background);
                    } else {
                        alert("This account is not yet activated.\nPlease check your email for the verification code.");
                        history.push("/auth/account-verify");
                    }
                }
            })
            // Throws other errors
            .catch(error => {
                setIsLoading(false);
                alert("There was an unexpected error. Error message: " + error);
            });
    }

    return (
        <form className="auth-form" onSubmit={signIn}>
            <input type="email" name="email" placeholder={authDisplayStrings.loginEmailPlaceholder}
                   onChange={e => setEmail(e.target.value)} required/>
            <input type="password" name="password" placeholder={authDisplayStrings.loginPasswordPlaceholder}
                   onChange={e => setPassword(e.target.value)} required/>
            {!isLoading ?
                <button type="submit" className="button-dark">{authDisplayStrings.loginSignInButton}</button>
                : <button disabled>{authDisplayStrings.loginSigningIn}</button>}
        </form>
    )
}

export default LoginEmail;