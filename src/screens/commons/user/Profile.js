import React from "react";
import "./Profile.css";
import ProfileBanner from "../../../components/profile/ProfileBanner";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileDetails from "../../../components/profile/ProfileDetails";
import jwtDecode from "jwt-decode";
import ProfileLeftSidebar from "../../../components/profile/ProfileAside";
import ProfileDetailsRightSidebar from "../../../components/profile/ProfileDetailsAside";
import ProfileEdit from "../../../components/profile/ProfileEdit";

const Profile = (props) => {
    // Checks for access token
    let user = null;
    let token = localStorage.getItem("accessToken");

    // Redirects if unauthorized
    if (token == null) {
        return (
            <Redirect to="/home"/>
        )
    }
    // Renders the page otherwise
    else {
        // Decodes the access token and add values to user object
        user = jwtDecode(token);
        return (
            <div className="page-container">
                {/*Banner with profile picture and user's quick details*/}
                <ProfileBanner/>
                {/*Main container*/}
                <div className="grid-container">
                    {/*Left sidebar with navigation links*/}
                    <aside className="aside-left">
                        <ProfileLeftSidebar/>
                    </aside>
                    {/*Main view*/}
                    <main>
                        <Switch>
                            <Route path={`/profile/${user.id}`} component={ProfileDetails}/>
                            <Route path={`${props.match.url}/edit-profile`} component={ProfileEdit}/>
                        </Switch>
                    </main>
                    {/*Right sidebar with additional info and controls*/}
                    <aside className="aside-right">
                        <Route path={`/profile/${user.id}`} component={ProfileDetailsRightSidebar}/>
                    </aside>
                </div>
            </div>


        )
    }
}

export default Profile;