import React from "react";
import ProfileBanner from "../../components/user/profile/ProfileBanner";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileDetails from "../../components/user/profile/details/ProfileDetails";
import ProfileEdit from "../../components/user/profile/edit/ProfileEdit";
import UserNavSidebar from "../../components/user/UserSidebar";

const Profile = () => {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let token = JSON.parse(localStorage.getItem("accessToken"));

    // Redirects if unauthorized
    if (token == null) {
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
                <ProfileBanner/>
                {/*Main container*/}
                <div className="grid-container">
                    {/*Main view*/}
                    <Switch>
                        <Route exact path={`/${user.id}`}
                               component={() => (<Redirect to={`/${user.id}/profile`}/>)}/>
                        <Route path={`/${user.id}/profile`} component={ProfileDetails}/>
                        <Route path={`/${user.id}/edit-profile`} component={ProfileEdit}/>
                    </Switch>
                    {/*Right sidebar with additional info and controls*/}
                    <UserNavSidebar/>
                </div>
            </div>


        )
    }
}

export default Profile;