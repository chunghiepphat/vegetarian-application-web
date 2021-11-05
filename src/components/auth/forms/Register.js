import React, {useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {apiBase} from "../../../helpers/Helpers";

const Register = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // Initializes parameters
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles registration requests
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
        const api = `${apiBase}/user/signup`;
        const response = await fetch(api, request)
        if (response.ok) {
            history.push("/auth/verify");
        } else if (response.status >= 400 && response.status < 600) {
            const error = await response.json();
            setMessage(error.message);
            setIsLoading(false);
            if (message !== undefined) alert(message);
            else alert("An unexpected error has occurred. Status code: " + response.status);
        }
        // // Checks response
        // .then(response => {
        //     if (response.ok) {
        //         alert("Account created successfully, logging you in...");
        //         return response.json();
        //     } else if (response.status === 401) {
        //         setIsLoading(false);
        //         alert("An account with that email already exists, please try another.");
        //     } else {
        //         setIsLoading(false);
        //         alert("Unable to complete request, there was an unexpected error.")
        //     }
        // })
        // // Saves access token if response is green
        // .then(result => {
        //     if (result) {
        //         localStorage.setItem("accessToken", JSON.stringify(result));
        //         localStorage.setItem("userInfo", JSON.stringify(jwtDecode(JSON.stringify(result))));
        //         history.goBack();
        //     }
        // })
        // // Throws other errors
        // .catch(error => {
        //     setIsLoading(false);
        //     alert("There was an unexpected error. Error message: " + error);
        // });
    }

    // Renders the form
    return (
        <div className="auth-section">
            <h1>Welcome</h1>
            <p>Already have an account? <Link to={{
                pathname: "/login",
                state: {background: location}
            }}>Sign in!</Link></p>
            <h2>Sign up with your email</h2>
            <form className="auth-form" onSubmit={signUp}>
                <input type="text" placeholder="First name"
                       onChange={e => setFirstName(e.target.value)} required/>
                <input type="text" placeholder="Last name"
                       onChange={e => setLastName(e.target.value)} required/>
                <input type="email" placeholder="Email address"
                       onChange={e => props.setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter password"
                       onChange={e => setPassword(e.target.value)}
                       required/>
                <input type="password" placeholder="Confirm password (placeholder)"/>
                {!isLoading ?
                    <button type="submit" className="button-submit">Create new account</button>
                    :
                    <button disabled>Creating your account...</button>
                }
            </form>
        </div>
    )
}

export default Register;