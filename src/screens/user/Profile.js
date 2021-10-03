import React from "react";
import "./Profile.css";
import UserBanner from "../../components/user/profile/UserBanner";
import {Redirect, Route, Switch} from "react-router-dom";
import UserDashboard from "../../components/user/profile/UserDashboard";
import UserUpdate from "../../components/user/profile/UserUpdate";
import ProfileSidebar from "../../components/user/ProfileSidebar";

const Profile = () => {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let token = JSON.parse(localStorage.getItem("accessToken"));

    // Redirects if unauthorized
    if (token === null) {
        return (
            <Redirect to="/home"/>
        )
    }
    // Renders the page otherwise
    else {
        // Decodes the access token and add values to user object
        return (
            <div className="page-container">
                {/*HomeBanner with profile picture and user's quick details*/}
                <UserBanner/>
                {/*Main container*/}
                <div className="grid-container">
                    {/*Main view*/}
                    <Switch>
                        <Route exact path={`/${user.id}`}
                               component={() => (<Redirect to={`/${user.id}/dashboard`}/>)}/>
                        <Route exact path={`/${user.id}/dashboard`} component={UserDashboard}/>
                        <Route path={`/${user.id}/update`} component={UserUpdate}/>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                    {/*Right sidebar with additional info and controls*/}
                    <ProfileSidebar/>
                </div>
            </div>
        )
    }
}

export default Profile;