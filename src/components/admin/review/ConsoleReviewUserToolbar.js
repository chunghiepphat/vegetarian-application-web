import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import OverviewCard from "../elements/OverviewCard";
import {FaAngleLeft} from "react-icons/fa";
import {consoleDisplayStrings} from "../../../resources/AdminDisplayStrings";

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

    const [flagCountRecent, setFlagCountRecent] = useState(0);
    const [flagRateTotal, setFlagRateTotal] = useState(0);
    const getFlagCounts = async () => {
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiUrl}/user/countflag/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            const result = await response.json();
            setFlagCountRecent(result.totalFlag);
            setFlagRateTotal(result.rate);
        }
    }
    useEffect(getFlagCounts, []);

    return (
        <div className="console-toolbar">
            <div className="toolbar-section">
                <a href="javascript:history.back()"><FaAngleLeft/> {consoleDisplayStrings.consoleBack}</a>
                <h1>{consoleDisplayStrings.consoleOverview}</h1>
                {profile && profile.is_active && <p className="text-positive">
                    {consoleDisplayStrings.consoleAccountActive}</p>}
                {profile && !profile.is_active && <p className="text-negative">
                    {consoleDisplayStrings.consoleAccountDisabled}</p>}
            </div>
            <div className="toolbar-section">
                <Panel>
                    <OverviewCard number={flagCountRecent} text="Flags in the past 3 days"/>
                    <OverviewCard number={flagRateTotal} text="Flagged rate (%)"/>
                </Panel>
                {profile && profile.is_active ? <>
                    <button className="button-light" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                        {consoleDisplayStrings.consoleDeactivateAccount}
                    </button>
                </> : <>
                    <button className="button-dark" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                        {consoleDisplayStrings.consoleReactivateAccount}
                    </button>
                </>}
            </div>
        </div>
    )
}

export default ConsoleReviewUserToolbar;