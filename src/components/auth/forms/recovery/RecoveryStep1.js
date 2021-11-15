import React, {useState} from "react";
import {apiBase} from "../../../../helpers/Variables";

const RecoveryStep1 = ({history, email, setEmail, setStep}) => {
    const [isLoading, setIsLoading] = useState(false);
    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles registration requests
    const requestRecovery = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiBase}/user/forgot?email=${email}`;
        const response = await fetch(api, request)
        if (response.ok) {
            setStep(2);
            setIsLoading(false)
        } else if (response.status >= 400 && response.status < 600) {
            const error = response.json();
            let message = error.message;
            if (message !== undefined) alert(message);
            else alert("An unexpected error has occurred. Status code: " + response.status);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>Recover your account</h1>
            <p>Enter your email below.</p>
            <form className="auth-form" onSubmit={requestRecovery}>
                <input type="text" placeholder="Your account email"
                       onChange={e => setEmail(e.target.value)} required/>
                {!isLoading ? <>
                    <button type="submit" className="button-dark">Proceed</button>
                </> : <>
                    <button disabled>Processing...</button>
                </>}
            </form>
        </div>
    )
}

export default RecoveryStep1;