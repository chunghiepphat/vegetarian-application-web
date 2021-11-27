import React, {useContext} from "react";
import {profileDisplayStrings} from "../../resources/UserDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "../commons/elements/bars/Navbar";
import UpdateAvatar from "./profile/UpdateAvatar";
import UpdateProfile from "./profile/UpdateProfile";
import UpdatePassword from "./profile/UpdatePassword";

const Profile = ({reload}) => {
    // Localizations
    profileDisplayStrings.setLanguage(useContext(LocaleContext));

    const urlAvatar = "/update/avatar";
    const urlProfile = "/update/profile";
    const urlPassword = "/update/password";
    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlAvatar}>{profileDisplayStrings.profilePictureTab}</NavLink>
                            <NavLink to={urlProfile}>{profileDisplayStrings.profileDetailsTab}</NavLink>
                            <NavLink to={urlPassword}>{profileDisplayStrings.profilePasswordTab}</NavLink>
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