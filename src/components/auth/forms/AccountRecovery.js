import React, {useState} from "react";
import {apiBase} from "../../../helpers/Variables";
import {useHistory} from "react-router-dom";

const AccountRecovery = ({email, setEmail}) => {
    const history = useHistory();
    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles registration requests
    const requestRecovery = async (e) => {
        e.preventDefault();
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiBase}/user/forgot?email=${email}`;
        const response = await fetch(api, request)
        if (response.ok) {
            history.push("/auth/reset-password");
        } else if (response.status >= 400 && response.status < 600) {
            const error = response.json();
            let message = error.message;
            if (message !== undefined) alert(message);
            else alert("An unexpected error has occurred. Status code: " + response.status);
        }
    }

    return (
        <div className="auth-section">
            <h1>Recover your account</h1>
            <p>Enter your email below.</p>
            <form className="auth-form" onSubmit={requestRecovery}>
                <input type="text" placeholder="Your account email"
                       onChange={e => setEmail(e.target.value)} required/>
                <button type="submit" className="button-dark">Reset your password</button>
            </form>
        </div>
    )

}

export default AccountRecovery;