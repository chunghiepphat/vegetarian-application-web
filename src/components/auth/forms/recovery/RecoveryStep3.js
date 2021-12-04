import React, {useContext, useState} from "react";
import {requestErrorStrings} from "../../../../resources/CommonDisplayStrings";
import {authDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {apiUrl} from "../../../../helpers/Variables";

const RecoveryStep3 = ({history, email, setStep}) => {
    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Handles password reset
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        const api = `${apiUrl}/user/resetPassword`;
        try {
            const response = await fetch(api, request)
            if (response.ok) {
                setStep(1);
                alert(authDisplayStrings.recoverySuccess)
                history.push({
                    pathname: "/login",
                    state: {background: {pathname: "/home"}}
                });
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
            <h1>{authDisplayStrings.recoveryStep3}</h1>
            <p style={{marginBottom: "40px"}}>{authDisplayStrings.recoveryStep3Instruction}</p>
            <form className="auth-form" onSubmit={resetPassword}>
                <input type="password" placeholder={authDisplayStrings.recoveryNewPassword}
                       onChange={e => setNewPassword(e.target.value)} required/>
                <input type="password" placeholder={authDisplayStrings.recoveryConfirmPassword}
                       onChange={e => setConfirmPassword(e.target.value)} required/>
                {!isLoading ? <button type="submit" className="button-dark">{authDisplayStrings.recoveryFinish}</button>
                    : <button disabled>{authDisplayStrings.recoveryProcessing}</button>}
            </form>
        </div>
    )
}

export default RecoveryStep3;