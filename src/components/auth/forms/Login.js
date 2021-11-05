import React, {useState} from "react";
import {Link, useHistory, useLocation, withRouter} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {apiBase} from "../../../helpers/Helpers";

const Login = () => {
    const history = useHistory();
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // Initializes parameters
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
        const api = `${apiBase}/user/signin`;
        await fetch(api, request)
            // Checks response, gets access token if green, throws error if not
            .then(response => {
                if (response.ok) {
                    alert("Authentication successful.");
                    return response.json();
                } else if (response.status >= 400 && response.status < 600) {
                    const error = response.json();
                    setMessage(error.message);
                    setIsLoading(false);
                    if (message !== undefined) alert(message);
                    else alert("An unexpected error has occurred. Status code: " + response.status);
                }
            })
            // Saves result if response is green
            .then(result => {
                if (result) {
                    localStorage.setItem("accessToken", JSON.stringify(result));
                    localStorage.setItem("userInfo", JSON.stringify(jwtDecode(JSON.stringify(result))));
                    history.goBack();
                }
            })
            // Throws other errors
            .catch(error => {
                setIsLoading(false);
                alert("There was an unexpected error. Error message: " + error);
            });
    }

    // Renders the form
    return (
        <div className="auth-section">
            <h1>Welcome back!</h1>
            <p>Don't have an account? <Link to={{
                pathname: "/auth/register",
            }}>Sign up!</Link></p>
            {/*Social authentication*/}
            <h2>Continue with your social media</h2>
            <button>Facebook placeholder</button>
            <button>Google placeholder</button>
            {/*Email authentication*/}
            <h2>Sign in with your email</h2>
            <form className="auth-form" onSubmit={signIn}>
                <input type="email" name="email" placeholder="Enter email"
                       onChange={e => setEmail(e.target.value)}
                       required/>
                <input type="password" name="password" placeholder="Enter password"
                       onChange={e => setPassword(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-submit">Sign in</button>
                    :
                    <button disabled>Logging you in...</button>
                }
            </form>
        </div>
    )
}

export default Login;