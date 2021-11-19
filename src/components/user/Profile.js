import React from "react";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import UpdateAvatar from "./profile/UpdateAvatar";
import UpdateProfile from "./profile/UpdateProfile";
import UpdatePassword from "./profile/UpdatePassword";
import DashboardSidebar from "./DashboardSidebar";

const Profile = ({reload}) => {
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
                        <Route path={urlAvatar}><UpdateAvatar reload={reload}/></Route>
                        <Route path={urlProfile}><UpdateProfile reload={reload}/></Route>
                        <Route path={urlPassword}><UpdatePassword reload={reload}/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>

    )
}
export default Profile;