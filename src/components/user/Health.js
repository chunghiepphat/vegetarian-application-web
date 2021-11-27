import React, {useContext, useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import UpdateHealth from "./health/UpdateHealth";
import UpdateAllergies from "./health/UpdateAllergies";
import UpdatePreferences from "./health/UpdatePreferences";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import {UserContext} from "../../context/UserContext";
import {healthDisplayStrings} from "../../resources/UserDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";

const Health = ({reload}) => {
    // Localizations
    healthDisplayStrings.setLanguage(useContext(LocaleContext));

    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const urlDetails = "/health/details";
    const urlAllergies = "/health/allergies";
    const urlPreferences = "/health/preferences";

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlDetails}>{healthDisplayStrings.healthDetailsTab}</NavLink>
                            <NavLink to={urlAllergies}>{healthDisplayStrings.healthAllergiesTab}</NavLink>
                            <NavLink to={urlPreferences}>{healthDisplayStrings.healthPreferencesTab}</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/health"><Redirect to={urlDetails}/></Route>
                        <Route path={urlDetails}>
                            <UpdateHealth user={user} token={token} reload={reload}/> </Route>
                        <Route path={urlAllergies}>
                            <UpdateAllergies user={user} token={token} reload={reload}/> </Route>
                        <Route path={urlPreferences}>
                            <UpdatePreferences user={user} token={token} reload={reload}/> </Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Health;