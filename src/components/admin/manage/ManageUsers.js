import { LocaleContext } from "context/LocaleContext";
import React, { useContext } from "react";
import { consoleDisplayStrings } from "resources/AdminDisplayStrings";
import ListUsers from "./users/ListUsers";

const ManageUsers = () => {
    consoleDisplayStrings.setLanguage(useContext(LocaleContext));
    return (
        <section>
            <header className="console-header">
                <h1>{consoleDisplayStrings.consoleMemberHeader}</h1>
            </header>
            <div className="console-content">
                <div className="user-table-header">
                    <div className="card-cell-1"/>
                    <div className="card-cell-2">{consoleDisplayStrings.consoleMemberNameEmail}</div>
                    <div className="card-cell-3">{consoleDisplayStrings.consoleMemberCountry}</div>
                    <div className="card-cell-4">{consoleDisplayStrings.consoleMemberRole}</div>
                    <div className="card-cell-5">{consoleDisplayStrings.consoleMemberAccountStatus}</div>
                </div>
                <ListUsers/>
            </div>
        </section>
    )
}

export default ManageUsers;