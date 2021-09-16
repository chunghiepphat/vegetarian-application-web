import React, {useState} from "react";
import "./Login.css";
import {Link, useHistory} from "react-router-dom";

const Login = () => {
    const api = "http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/user/signin";
    const history = useHistory();

    // Initializes parameters
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Handles login requests
    const signIn = async (event) => {
        event.preventDefault();

        // Generates request headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

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
        await fetch(api, request)
            // Checks response, gets access token if green, throws error if not
            .then(response => {
                if (response.ok) {
                    alert("Authentication successful.");
                    return response.json();
                } else if (response.status === 401) {
                    alert("Invalid credentials, please check your email and/or password.");
                } else {
                    alert("Unable to complete request. There was an unexpected error.")
                }
            })
            // Saves result if response is green
            .then(result => {
                if (result != null) {
                    localStorage.setItem("accessToken", JSON.stringify(result));
                    history.push("/home");
                }
            })
            // Throws other errors
            .catch(error => {
                alert("There was an unexpected error.")
            });
    }

    // Renders the form
    return (
        <div className="modal-content">
            <h1>Welcome back!</h1>
            <p>Don't have an account? <Link to={{
                pathname: "/register"
            }}>Sign up!</Link></p>
            {/*Social authentication*/}
            <h2>Continue with your social media</h2>
            <button>Placeholder</button>
            <button>Placeholder</button>
            {/*Email authentication*/}
            <h2>Sign in with your email</h2>
            <form className="modal-form" onSubmit={signIn}>
                <input type="email" name="email" placeholder="Enter email"
                       onChange={e => setEmail(e.target.value)}
                       required/>
                <input type="password" name="password" placeholder="Enter password"
                       onChange={e => setPassword(e.target.value)} required/>
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default Login;