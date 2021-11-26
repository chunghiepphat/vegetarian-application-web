import React, {useContext, useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import Form from "../../commons/elements/form/Form";
import LocalizedStrings from "react-localization";

const UpdatePassword = () => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            updatePasswordHeader: "Change password",
            currenPassword: "Your current password",
            currenPasswordPlaceholder: "Current password",
            newPassword: "New password",
            newPasswordPlaceholder: "New password",
            confirmPasswordPlaceholder: "Confirm password",
            passwordMatching: "Passwords match.",
            passwordNotMatching: "Passwords do not match.",
            passwordTooShort: "Password must be at least 8 characters.",
            updateButton: "Update",
            updatingButton: "Updating...",
            menuSaved: "Password updated successfully.",
        },
        vi: {
            updatePasswordHeader: "Đổi mật khẩu",
            currenPassword: "Mật khẩu hiện tại",
            currenPasswordPlaceholder: "Mật khẩu hiện tại",
            newPassword: "Mật khẩu mới",
            newPasswordPlaceholder: "Mật khẩu mới",
            confirmPasswordPlaceholder: "Xác nhận mật khẩu mới",
            passwordMatching: "Mật khẩu khớp.",
            passwordNotMatching: "Mật khẩu không khớp.",
            passwordTooShort: "Mật khẩu phải dài ít nhất 8 ký tự.",
            updateButton: "Cập nhật",
            updatingButton: "Đang cập nhật...",
            menuSaved: "Cập nhật mật khẩu thành công.",
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    // Authentication and API stuff
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiUrl}/user/update/password/${user.id}`;
    // Initializes parameters
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");
    // Validates input
    const checkConfirmation = () => {
        if (newPassword && confirmPassword) {
            if (newPassword.length >= 8) {
                if (newPassword === confirmPassword) {
                    setMessage(strings.passwordMatching);
                    setIsValid(true);
                } else {
                    setMessage(strings.passwordNotMatching);
                    setIsValid(false);
                }
            } else {
                setMessage(strings.passwordTooShort);
                setIsValid(false);
            }
        } else {
            setMessage("");
            setIsValid(false);
        }
    }
    useEffect(() => {
        checkConfirmation();
    }, [newPassword, confirmPassword]);
    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles update
    const updatePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Generates request body
        let body = JSON.stringify({
            "oldPassword": oldPassword,
            "password": newPassword,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert(strings.menuSaved);
                setIsLoading(false);
            } else if (response.status === 400) {
                alert("Your old password is incorrect, please try again.");
                setIsLoading(false);
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.");
                setIsLoading(false);
            } else {
                alert("Error: " + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert("Unexpected error: " + error);
            setIsLoading(false);
        }
    }

    return (
        <section>
            <header className="section-header">
                <h1>{strings.updatePasswordHeader}</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={updatePassword}>
                    <div style={{minHeight: "400px"}}>
                        {/*Password*/}
                        <label>{strings.currenPassword}
                            <input type="password"
                                   value={oldPassword}
                                   onChange={e => setOldPassword(e.target.value)}
                                   placeholder={strings.currenPasswordPlaceholder} required/>
                        </label>
                        <label>{strings.newPassword}
                            <input type="password"
                                   value={newPassword}
                                   onChange={e => setNewPassword(e.target.value)}
                                   placeholder={strings.newPasswordPlaceholder} required/>
                            <input type="password"
                                   value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}
                                   placeholder={strings.confirmPasswordPlaceholder} required/>
                        </label>
                        <p className={isValid ? `text-positive` : `text-negative`}
                           style={{fontWeight: "600"}}>{message}</p>
                    </div>
                    <div className="sticky-bottom">
                        {!isLoading ?
                            <button type="submit" className="button-dark"
                                    disabled={!isValid}>{strings.updateButton}</button>
                            : <button disabled>{strings.updatingButton}</button>}
                    </div>

                </Form>
            </div>
        </section>
    )
}

export default UpdatePassword;