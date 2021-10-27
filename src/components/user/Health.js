import React, {useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import HealthDetails from "./health/HealthDetails";
import FoodAllergies from "./health/FoodAllergies";
import FoodPreferences from "./health/FoodPreferences";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";

const Health = () => {
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
                        <Route path={urlDetails}><HealthDetails/></Route>
                        <Route path={urlAllergies}><FoodAllergies/></Route>
                        <Route path={urlPreferences}><FoodPreferences/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Health;