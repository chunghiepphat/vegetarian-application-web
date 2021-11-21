import React, {useState} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import LocalizedStrings from "react-localization";

const RecoveryStep3 = ({history, email, setStep}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Reset your password",
            instruction: "Please enter your new password below to complete the account retrieval process.",
            placeholderNewPassword: "New password",
            placeholderConfirmPassword: "Confirm password",
            buttonFinish: "Finish",
            loadingMessage: "Processing...",
        },
        vi: {
            header: "Đặt lại mật khẩu",
            instruction: "Vui lòng đặt mật khẩu mới của bạn để hoàn tất việc khôi phục tài khoản.",
            placeholderNewPassword: "Mật khẩu mới",
            placeholderConfirmPassword: "Xác nhận mật khẩu",
            buttonFinish: "Hoàn tất",
            loadingMessage: "Đang xử lý...",
        }
    });
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
                alert("Password reset successfully.")
                history.push({
                    pathname: "/login",
                    state: {background: {pathname: "/home"}}
                });
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
        <div className="auth-section">
            <h1>{strings.header}</h1>
            <p style={{marginBottom: "40px"}}>{strings.instruction}</p>
            <form className="auth-form" onSubmit={resetPassword}>
                <input type="password" placeholder={strings.placeholderNewPassword}
                       onChange={e => setNewPassword(e.target.value)} required/>
                <input type="password" placeholder={strings.placeholderConfirmPassword}
                       onChange={e => setConfirmPassword(e.target.value)} required/>
                {!isLoading ? <button type="submit" className="button-dark">{strings.buttonFinish}</button>
                    : <button disabled>{strings.loadingMessage}</button>}
            </form>
        </div>
    )
}

export default RecoveryStep3;