import React, {useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import {Link, useHistory, useLocation} from "react-router-dom";

const Verification = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // Initializes parameters
    const [code, setCode] = useState("");
    // Handles account verification
    const verify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request headers
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiBase}/user/verify?code=${code}`;
        const response = await fetch(api, request)
        if (response.ok) {
            history.push("/home");
        } else if (response.status >= 400 && response.status < 600) {
            const error = await response.json();
            setMessage(error.message);
            setIsLoading(false);
            if (message !== undefined) alert(message);
            else alert("An unexpected error has occurred. Status code: " + response.status);
        }
    }

    // Renders the form
    return (
        <div className="auth-section">
            <h1>Email verification</h1>
            <p>We have sent a verification code to {props.email}, please check your email.</p>
            <form className="auth-form" onSubmit={verify}>
                <input type="text" placeholder="Verification code"
                       onChange={e => setCode(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-submit">Verify account</button>
                    :
                    <button disabled>Verifying your account...</button>
                }
            </form>
        </div>
    )
}

export default Verification;