import React, {useContext, useEffect, useState} from "react";
import {authDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";

const AccountVerification = (props) => {
    const history = useHistory();

    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Resends code
    const [isResending, setIsResending] = useState(false);
    const [counter, setCounter] = useState(0);
    const resendCode = async (e) => {
        e.preventDefault();
        setIsResending(true)
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        const api = `${apiUrl}/user/sendagain/active?email=${props.email}`
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                setCounter(60);
                setIsResending(false);
            } else if (response.status >= 400 && response.status < 600) {
                const error = response.json();
                let message = error.message;
                if (message !== undefined) alert(message);
                else alert(requestErrorStrings.requestErrorStatus + response.status);
                setIsResending(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
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
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const verifyAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiUrl}/user/verify?code=${code}`;
        await fetch(api, request)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status >= 400 && response.status < 600) {
                    const error = response.json();
                    let message = error.message;
                    setIsLoading(false);
                    if (message !== undefined) alert(message);
                    else alert(requestErrorStrings.requestErrorStatus + response.status);
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
                alert(requestErrorStrings.requestErrorException + error);
            });
    }

    // Renders the form
    return (
        <div className="auth__wrapper--full">
            <h1>{authDisplayStrings.registerVerify}</h1>
            <p>{authDisplayStrings.registerInstructionPart1} {props.email}.</p>
            <p style={{marginBottom: "40px"}}>{authDisplayStrings.registerInstructionPart2}</p>
            <form className="auth-form" onSubmit={verifyAccount}>
                <input type="text" placeholder={authDisplayStrings.registerVerificationCode}
                       onChange={e => setCode(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-dark">{authDisplayStrings.registerVerifyButton}</button>
                    : <button disabled>{authDisplayStrings.registerVerifying}</button>}
                {!isResending ? <>
                    {!counter ?
                        <button type="button" className="button-light"
                                onClick={e => resendCode(e)}>{authDisplayStrings.authResendCode}</button>
                        : <button
                            disabled>{authDisplayStrings.authResendSuccess} {counter} {authDisplayStrings.authResendSeconds}.</button>}
                </> : <button disabled>{authDisplayStrings.authResending}</button>}
            </form>
        </div>
    )
}

export default AccountVerification;