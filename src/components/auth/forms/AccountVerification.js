import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {apiBase} from "../../../helpers/Variables";
import jwtDecode from "jwt-decode";

const AccountVerification = (props) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [counter, setCounter] = useState(0);
    // Initializes parameters
    const [code, setCode] = useState("");
    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Resends code
    const resendCode = async (e) => {
        e.preventDefault();
        setIsResending(true)
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        const api = `${apiBase}/user/sendagain/active?email=${props.email}`
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                setCounter(60);
                setIsResending(false);
            } else if (response.status >= 400 && response.status < 600) {
                const error = response.json();
                let message = error.message;
                if (message !== undefined) alert(message);
                else alert("An error has occurred. Status code: " + response.status);
                setIsResending(false);
            }
        } catch (error) {
            alert("There was an unexpected error. Error message: " + error);
            setIsResending(false);
        }
    }
    useEffect(() => {
        // Ends counter early when we reach 0
        if (!counter) return;
        // Saves intervalId to clear the interval when the component re-renders
        const intervalId = setInterval(() => {
            setCounter(counter - 1);
        }, 1000);
        // Clears interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [counter]);
    // Handles account verification
    const verifyAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiBase}/user/verify?code=${code}`;
        await fetch(api, request)
            .then(response => {
                if (response.ok) {
                    alert("Authentication successful.");
                    return response.json();
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
                    localStorage.setItem("accessToken", JSON.stringify(result));
                    localStorage.setItem("userInfo", JSON.stringify(jwtDecode(JSON.stringify(result))));
                    history.push("/home");
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
            <h1>Email verification</h1>
            <p>We have sent a verification code to {props.email}, please check your email.</p>
            <form className="auth-form" onSubmit={verifyAccount}>
                <input type="text" placeholder="Verification code"
                       onChange={e => setCode(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-dark">Verify account</button>
                    : <button disabled>Verifying your account...</button>}
                {!isResending ? <>
                    {!counter ?
                        <button type="button" className="button-light" onClick={e => resendCode(e)}>Resend code</button>
                        : <button disabled>Sent. You can try again in {counter} seconds.</button>
                    }
                </> : <>
                    <button disabled>Sending...</button>
                </>}
            </form>
        </div>
    )
}

export default AccountVerification;