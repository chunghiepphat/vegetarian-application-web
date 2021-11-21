import React, {useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {useHistory} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import jwtDecode from "jwt-decode";

const AccountVerification = (props) => {
    const history = useHistory();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Verify your email",
            instructionPart1: "We have sent a code to",
            instructionPart2: "Please check your email and enter the code below.",
            placeholderCode: "Verification code",
            buttonVerify: "Verify account",
            loadingMessage: "Verifying your account...",
            buttonResend: "Resend code",
            resendingMessage: "Resending...",
            resendingFinished: "Sent. You can try again in",
            seconds: "second(s)",
        },
        vi: {
            header: "Xác nhận email của bạn",
            instructionPart1: "Mã xác nhận đã được gửi tới",
            instructionPart2: "Vui lòng kiểm tra và nhập mã vào đây.",
            placeholderCode: "Mã xác nhận",
            buttonVerify: "Xác nhận",
            loadingMessage: "Đang kiểm tra...",
            buttonResend: "Gửi lại mã",
            resendingMessage: "Đang gửi lại...",
            resendingFinished: "Đã gửi. Bạn có thể thử lại trong",
            seconds: "giây",
        }
    });
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
            <h1>{strings.header}</h1>
            <p>{strings.instructionPart1} {props.email}.</p>
            <p style={{marginBottom: "40px"}}>{strings.instructionPart2}</p>
            <form className="auth-form" onSubmit={verifyAccount}>
                <input type="text" placeholder={strings.placeholderCode}
                       onChange={e => setCode(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-dark">{strings.buttonVerify}</button>
                    : <button disabled>{strings.loadingMessage}</button>}
                {!isResending ? <>
                    {!counter ?
                        <button type="button" className="button-light"
                                onClick={e => resendCode(e)}>{strings.buttonResend}</button>
                        : <button disabled>{strings.resendingFinished} {counter} {strings.seconds}.</button>}
                </> : <button disabled>{strings.resendingMessage}</button>}
            </form>
        </div>
    )
}

export default AccountVerification;