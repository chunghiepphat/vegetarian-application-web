import React, {useContext, useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import UpdateHealth from "./health/UpdateHealth";
import UpdateAllergies from "./health/UpdateAllergies";
import UpdatePreferences from "./health/UpdatePreferences";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import {UserContext} from "../../context/UserContext";

const Health = () => {
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
                            <NavLink to={urlDetails}>Health details</NavLink>
                            <NavLink to={urlAllergies}>Food allergies</NavLink>
                            <NavLink to={urlPreferences}>Food preferences</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/health"><Redirect to={urlDetails}/></Route>
                        <Route path={urlDetails}>
                            <UpdateHealth user={user} token={token} location={location}/> </Route>
                        <Route path={urlAllergies}>
                            <UpdateAllergies/> </Route>
                        <Route path={urlPreferences}>
                            <UpdatePreferences/> </Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Health;