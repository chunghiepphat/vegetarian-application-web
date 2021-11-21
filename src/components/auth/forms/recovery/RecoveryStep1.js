import React, {useState} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import LocalizedStrings from "react-localization";

const RecoveryStep1 = ({email, setEmail, setStep}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Recover your account",
            instruction: "Enter your email below.",
            placeholderEmail: "Your account email",
            buttonProceed: "Proceed",
            loadingMessage: "Processing...",
        },
        vi: {
            header: "Phục hồi tài khoản",
            instruction: "Nhập email liên kết với tài khoản của bạn.",
            placeholderEmail: "Nhập email",
            buttonProceed: "Tiếp tục",
            loadingMessage: "Đang xử lý...",
        }
    });
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
                else alert("There was an error. Status code: " + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert("An unexpected error has occurred: " + error);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>{strings.header}</h1>
            <p style={{marginBottom: "40px"}}>{strings.instruction}</p>
            <form className="auth-form" onSubmit={requestRecovery}>
                <input type="text" aria-label="email" placeholder={strings.placeholderEmail}
                       onChange={e => setEmail(e.target.value)} required/>
                {!isLoading ? <button type="submit" className="button-dark">{strings.buttonProceed}</button>
                    : <button disabled>{strings.loadingMessage}</button>}
            </form>
        </div>
    )
}

export default RecoveryStep1;