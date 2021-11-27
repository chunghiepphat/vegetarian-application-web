import React, {useContext, useEffect, useState} from "react";
import {profileDisplayStrings} from "../../../resources/UserDisplayStrings";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";

const UpdatePassword = () => {
    // Localizations
    profileDisplayStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Initializes parameters
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [isValid, setIsValid] = useState(false);
    let [message, setMessage] = useState("");

    // Validates input
    const checkConfirmation = () => {
        if (newPassword && confirmPassword) {
            if (newPassword.length >= 8) {
                if (newPassword === confirmPassword) {
                    setMessage(profileDisplayStrings.profilePasswordMatching);
                    setIsValid(true);
                } else {
                    setMessage(profileDisplayStrings.profilePasswordNotMatching);
                    setIsValid(false);
                }
            } else {
                setMessage(profileDisplayStrings.profilePasswordTooShort);
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
    const [isLoading, setIsLoading] = useState(false);
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
        const api = `${apiUrl}/user/update/password/${user.id}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert(profileDisplayStrings.profilePasswordUpdateSuccess);
                setIsLoading(false);
            } else if (response.status === 400) {
                alert(profileDisplayStrings.profilePasswordIncorrect);
                setIsLoading(false);
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized);
                setIsLoading(false);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
        }
    }

    return (
        <section>
            <header className="section-header">
                <h1>{profileDisplayStrings.profilePassword}</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={updatePassword}>
                    <div style={{minHeight: "400px"}}>
                        {/*Password*/}
                        <label>{profileDisplayStrings.profilePasswordCurrent}
                            <input type="password"
                                   value={oldPassword}
                                   onChange={e => setOldPassword(e.target.value)}
                                   placeholder={profileDisplayStrings.profilePasswordCurrentPlaceholder} required/>
                        </label>
                        <label>{profileDisplayStrings.profilePasswordNew}
                            <input type="password"
                                   value={newPassword}
                                   onChange={e => setNewPassword(e.target.value)}
                                   placeholder={profileDisplayStrings.profilePasswordNewPlaceholder} required/>
                            <input type="password"
                                   value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}
                                   placeholder={profileDisplayStrings.profilePasswordConfirmationPlaceholder} required/>
                        </label>
                        <p className={isValid ? `text-positive` : `text-negative`}
                           style={{fontWeight: "600"}}>{message}</p>
                    </div>
                    <div className="sticky-bottom">
                        {!isLoading ?
                            <button type="submit" className="button-dark"
                                    disabled={!isValid}>{profileDisplayStrings.profilePasswordUpdate}</button>
                            : <button disabled>{profileDisplayStrings.profilePasswordUpdating}</button>}
                    </div>

                </Form>
            </div>
        </section>
    )
}

export default UpdatePassword;