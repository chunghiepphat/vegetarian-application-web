import React, {useState} from "react";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";
import UpdateProfile from "./update/UpdateProfile";
import UpdateAvatar from "./update/UpdateAvatar";
import UpdatePassword from "./update/UpdatePassword";

const UserUpdate = () => {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    const urlPicture = `/${user.id}/update/update-picture`;
    const urlProfile = `/${user.id}/update/update-profile`;
    const urlPassword = `/${user.id}/update/update-password`;
    return (
        <main>
            <section className="page-navbar">
                <Navbar>
                    <Link to={urlPicture}>Update picture</Link>
                    <Link to={urlProfile}>Update profile</Link>
                    <Link to={urlPassword}>Change password</Link>
                </Navbar>
            </section>
            <UpdateProfile/>
            <Switch>
                <Route exact path={urlPicture} component={<UpdateAvatar/>}/>
                <Route exact path={urlProfile} component={<UpdateProfile/>}/>
                <Route exact path={urlPassword} component={<UpdatePassword/>}/>
            </Switch>
        </main>
    )
}
export default UserUpdate;