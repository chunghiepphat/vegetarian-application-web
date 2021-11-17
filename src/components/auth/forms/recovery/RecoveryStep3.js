import React, {useState} from "react";
import {apiBase} from "../../../../helpers/Variables";

const RecoveryStep3 = ({history, email, setStep}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request body
        let body = JSON.stringify({
            "email": email,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiBase}/user/resetPassword`;
        const response = await fetch(api, request)
        if (response.ok) {
            setStep(1);
            history.push("/home");
        } else if (response.status >= 400 && response.status < 600) {
            const error = response.json();
            let message = error.message;
            if (message !== undefined) alert(message);
            else alert("An unexpected error has occurred. Status code: " + response.status);
            setIsLoading(false);
        }
    }
    return (
        <div className="auth-section">
            <h1>Reset your password</h1>
            <p>Please enter your new password below to complete the account retrieval process.</p>
            <form className="auth-form" onSubmit={resetPassword}>
                <input type="text" placeholder="New password"
                       onChange={e => setNewPassword(e.target.value)} required/>
                <input type="text" placeholder="Confirm password"
                       onChange={e => setConfirmPassword(e.target.value)} required/>
                {!isLoading ? <>
                    <button type="submit" className="button-dark">Finish</button>
                </> : <>
                    <button disabled>Processing...</button>
                </>}
            </form>
        </div>
    )
}

export default RecoveryStep3;