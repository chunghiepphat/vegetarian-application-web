import React, {useContext, useEffect, useState} from "react";
import {requestErrorStrings} from "../../../../resources/CommonDisplayStrings";
import {authDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {apiUrl} from "../../../../helpers/Variables";

const RecoveryStep2 = ({email, setStep}) => {
    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Resends code
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [counter, setCounter] = useState(0);
    const [code, setCode] = useState("");
    const resendCode = async (e) => {
        e.preventDefault();
        setIsResending(true)
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        const api = `${apiUrl}/user/sendagain/reset?email=${email}`
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

    // Handles recovery requests
    const verifyRecovery = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiUrl}/user/verify/resetpassword?code=${code}`;
        try {
            const response = await fetch(api, request)
            if (response.ok) {
                setStep(3);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                const error = response.json();
                let message = error.message;
                if (message !== undefined) alert(message);
                else alert(requestErrorStrings.requestErrorStatus + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>{authDisplayStrings.recoveryStep2}</h1>
            <p>{authDisplayStrings.recoveryStep2InstructionPart1} {email}.</p>
            <p style={{marginBottom: "40px"}}>{authDisplayStrings.recoveryStep2InstructionPart2}</p>
            <form className="auth-form" onSubmit={verifyRecovery}>
                <input type="text" placeholder={authDisplayStrings.recoveryVerificationCode}
                       onChange={e => setCode(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-dark">{authDisplayStrings.recoveryProceed}</button>
                    : <button disabled>{authDisplayStrings.recoveryProcessing}</button>}
                {!isResending ? <>
                    {!counter ? <button type="button" className="button-light"
                                        onClick={e => resendCode(e)}>{authDisplayStrings.authResendCode}</button>
                        : <button
                            disabled>{authDisplayStrings.authResendSuccess} {counter} {authDisplayStrings.authResendSeconds}.</button>}
                </> : <button disabled>{authDisplayStrings.authResending}</button>}
            </form>
        </div>
    )
}
export default RecoveryStep2;