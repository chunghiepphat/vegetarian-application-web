import React from "react";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import OverviewCard from "../elements/OverviewCard";
import {FaAngleLeft} from "react-icons/fa";

const ConsoleReviewUserToolbar = ({id, token, profile, fetchProfile}) => {
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles account activation/deactivation
    const deactivateUser = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "is_active": !profile.is_active,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/changestatus/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            await fetchProfile();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    return (
        <div className="console-toolbar">
            <a href="javascript:history.back()"><FaAngleLeft/> Go back</a>
            <h1>Overview</h1>
            {profile && profile.is_active && <p className="text-positive">Active account</p>}
            {profile && !profile.is_active && <p className="text-negative">Account disabled</p>}
            <Panel>
                <OverviewCard number={2} text="Flags in the past 3 days"/>
                <OverviewCard number="1%" text="Flagged rate"/>
            </Panel>
            {profile && profile.is_active ? <>
                <button className="button-light" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                    Deactivate this account
                </button>
            </> : <>
                <button className="button-dark" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                    Re-activate this account
                </button>
            </>}
        </div>
    )
}

export default ConsoleReviewUserToolbar;