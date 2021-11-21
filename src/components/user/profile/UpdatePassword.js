import React, {useContext, useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import Form from "../../commons/elements/form/Form";

const UpdatePassword = () => {
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
                    setMessage("Passwords match.");
                    setIsValid(true);
                } else {
                    setMessage("Passwords do not match.");
                    setIsValid(false);
                }
            } else {
                setMessage("Password must be at least 8 characters.");
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
                alert("Password updated successfully.");
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
                <h1>Change password</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={updatePassword}>
                    <div style={{minHeight: "400px"}}>
                        {/*Password*/}
                        <label>Your current password
                            <input type="password"
                                   value={oldPassword}
                                   onChange={e => setOldPassword(e.target.value)}
                                   placeholder="Current password" required/>
                        </label>
                        <label>New password
                            <input type="password"
                                   value={newPassword}
                                   onChange={e => setNewPassword(e.target.value)}
                                   placeholder="New password" required/>
                            <input type="password"
                                   value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}
                                   placeholder="Confirm password" required/>
                        </label>
                        <p className={isValid ? `text-positive` : `text-negative`}>{message}</p>
                    </div>
                    <div className="sticky-bottom">
                        {!isLoading ?
                            <button type="submit" className="button-dark" disabled={!isValid}>Update</button>
                            : <button disabled>Updating...</button>}
                    </div>

                </Form>
            </div>
        </section>
    )
}

export default UpdatePassword;