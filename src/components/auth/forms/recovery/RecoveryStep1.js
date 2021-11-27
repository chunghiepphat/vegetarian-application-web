import React, {useContext, useState} from "react";
import {requestErrorStrings} from "../../../../resources/CommonDisplayStrings";
import {authDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {apiUrl} from "../../../../helpers/Variables";

const RecoveryStep1 = ({email, setEmail, setStep}) => {
    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Generates request headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Handles registration requests
    const [isLoading, setIsLoading] = useState(false);
    const requestRecovery = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiUrl}/user/forgot?email=${email}`;
        const response = await fetch(api, request)
        try {
            if (response.ok) {
                setStep(2);
                setIsLoading(false)
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
            <h1>{authDisplayStrings.recoveryStep1}</h1>
            <p style={{marginBottom: "40px"}}>{authDisplayStrings.recoveryStep1Instruction}</p>
            <form className="auth-form" onSubmit={requestRecovery}>
                <input type="text" aria-label="email" placeholder={authDisplayStrings.recoveryEmailPlaceholder}
                       onChange={e => setEmail(e.target.value)} required/>
                {!isLoading ?
                    <button type="submit" className="button-dark">{authDisplayStrings.recoveryProceed}</button>
                    : <button disabled>{authDisplayStrings.recoveryProcessing}</button>}
            </form>
        </div>
    )
}

export default RecoveryStep1;