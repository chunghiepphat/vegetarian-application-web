import React, {useState} from "react";
import {Link, NavLink, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import ProfileAvatar from "./profile/ProfileAvatar";
import ProfileDetails from "./profile/ProfileDetails";
import ProfilePassword from "./profile/ProfilePassword";
import DashboardSidebar from "./DashboardSidebar";

const Profile = () => {
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
                        <Route path={urlAvatar}><ProfileAvatar/></Route>
                        <Route path={urlProfile}><ProfileDetails/></Route>
                        <Route path={urlPassword}><ProfilePassword/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>

    )
}
export default Profile;