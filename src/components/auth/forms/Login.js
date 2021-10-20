import React, {useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {apiBase} from "../../../helpers/Helpers";

const Login = () => {
    const api = `${apiBase}/user/signin`;
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
                    localStorage.setItem("userInfo", JSON.stringify(jwtDecode(JSON.stringify(result))));
                    history.push("/home");
                }
            })
            // Throws other errors
            .catch(error => {
                alert("There was an unexpected error. Error message: " + error);
            });
    }

    // Renders the form
    return (
        <div className="modal-content">
            <h1>Welcome back!</h1>
            <p>Don't have an account? <Link to={{
                pathname: "/register",
            }}>Sign up!</Link></p>
            {/*Social authentication*/}
            <h2>Continue with your social media</h2>
            <button>Facebook placeholder</button>
            <button>Google placeholder</button>
            {/*Email authentication*/}
            <h2>Sign in with your email</h2>
            <form className="modal-form" onSubmit={signIn}>
                <input type="email" name="email" placeholder="Enter email"
                       onChange={e => setEmail(e.target.value)}
                       required/>
                <input type="password" name="password" placeholder="Enter password"
                       onChange={e => setPassword(e.target.value)} required/>
                <button type="submit" className="button-submit">Sign in</button>
            </form>
        </div>
    )
}

export default Login;