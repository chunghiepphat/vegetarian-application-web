import React, {useState} from "react";
import "./Login.css";
import {Link, useHistory} from "react-router-dom";

const Register = () => {
    const api = "http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/user/signup";
    const history = useHistory();

    // Initializes parameters
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle registration requests
    const signUp = async (event) => {
        event.preventDefault();

        // Generates request headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        // Generates request body
        let body = JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        });

        // Generates request
        let data = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        console.log(body)

        // Executes fetch
        await fetch(api, data)

            // Checks response, redirects if green, throws error if not
            .then(response => {
                console.log(response);
                if (response.ok) {
                    alert("Account created successfully, logging you in...");
                    return response.json();
                } else {
                    alert("An account with that email already exists, please try another.");
                }
            })

            // Saves result if response is green
            .then(result => {
                if (result != null) {
                    console.log(result);
                    localStorage.setItem("accessToken", JSON.stringify(result));
                    history.push("/home");
                }
            })

            // Throws other errors
            .catch(error => {
                console.log('error', error)
                alert("There was an unexpected error.");
            });
    }

    // Render the form
    return (
        <div className="modal-content">
            <h1>Welcome</h1>
            <p>Already have an account? <Link to={{
                pathname: "/auth",
            }}>Sign in!</Link></p>
            <h2>Sign up with your email</h2>
            <form className="modal-form" onSubmit={signUp}>
                <input type="text" placeholder="First name"
                       onChange={e => setFirstName(e.target.value)} required/>
                <input type="text" placeholder="Last name"
                       onChange={e => setLastName(e.target.value)} required/>
                <input type="email" placeholder="Email address"
                       onChange={e => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter password"
                       onChange={e => setPassword(e.target.value)}
                       required/>
                <input type="password" placeholder="Confirm password (placeholder)"/>
                <button type="submit">Create new account</button>
            </form>
        </div>
    )
}

export default Register;