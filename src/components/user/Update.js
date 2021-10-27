import React, {useState} from "react";
import {Link, NavLink, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import UpdateAvatar from "./update/UpdateAvatar";
import UpdateProfile from "./update/UpdateProfile";
import UpdatePassword from "./update/UpdatePassword";
import DashboardSidebar from "./DashboardSidebar";

const Update = () => {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    const urlAvatar = "/update/avatar";
    const urlProfile = "/update/profile";
    const urlPassword = "/update/password";
    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlAvatar}>Update picture</NavLink>
                            <NavLink to={urlProfile}>Update profile</NavLink>
                            <NavLink to={urlPassword}>Change password</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/update"><Redirect to={urlProfile}/></Route>
                        <Route path={urlAvatar}><UpdateAvatar/></Route>
                        <Route path={urlProfile}><UpdateProfile/></Route>
                        <Route path={urlPassword}><UpdatePassword/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>

    )
}
export default Update;