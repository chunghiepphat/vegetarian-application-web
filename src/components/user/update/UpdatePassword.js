import React, {useContext, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import {UserContext} from "../../../context/UserContext";

const UpdatePassword = () => {
    // Authentication and API stuff
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/user/update/password/${user.id}`;

    // Initializes parameters
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const updatePassword = async (event) => {
        event.preventDefault();
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
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Password updated successfully.");
            window.location.reload();
        } else if (response.status === 400) {
            alert("Your old password is incorrect, please try again.");
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.");
        } else {
            alert("Error: " + response.status);
        }
    }
    return (
        <section>
            <header className="section-header">
                <h1>Change password</h1>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={updatePassword}>
                    {/*Password*/}
                    <label>
                        <span>Your current password</span>
                        <input type="password"
                               value={oldPassword}
                               onChange={e => setOldPassword(e.target.value)}
                               placeholder="Current password" required/>
                    </label>
                    <label>
                        <span>New password</span>
                        <input type="password"
                               value={newPassword}
                               onChange={e => setNewPassword(e.target.value)}
                               placeholder="New password" required/>
                        <input type="password"
                               value={confirmPassword}
                               onChange={e => setConfirmPassword(e.target.value)}
                               placeholder="Confirm password" required/>
                    </label>
                    <button>Update</button>
                </form>
            </div>
        </section>
    )
}

export default UpdatePassword;