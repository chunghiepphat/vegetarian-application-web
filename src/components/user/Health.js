import React, {useContext, useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import UpdateHealth from "./health/UpdateHealth";
import UpdateAllergies from "./health/UpdateAllergies";
import UpdatePreferences from "./health/UpdatePreferences";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import {UserContext} from "../../context/UserContext";
import LocalizedStrings from "react-localization";

const Health = ({reload}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            healthDetails: "Health details",
            foodAllergies: "Food allergies",
            foodPreferences: "Food preferences",
        },
        vi: {
            healthDetails: "Hồ sơ sức khỏe",
            foodAllergies: "Thực phẩm dị ứng",
            foodPreferences: "Thực phẩm yêu thích",
        }
    });

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
                            <NavLink to={urlDetails}>{strings.healthDetails}</NavLink>
                            <NavLink to={urlAllergies}>{strings.foodAllergies}</NavLink>
                            <NavLink to={urlPreferences}>{strings.foodPreferences}</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/health"><Redirect to={urlDetails}/></Route>
                        <Route path={urlDetails}>
                            <UpdateHealth user={user} token={token} location={location} reload={reload}/> </Route>
                        <Route path={urlAllergies}>
                            <UpdateAllergies user={user} token={token} location={location} reload={reload}/> </Route>
                        <Route path={urlPreferences}>
                            <UpdatePreferences user={user} token={token} location={location} reload={reload}/> </Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Health;