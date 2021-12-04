import React from "react";
import Avatar from "../../commons/elements/Avatar";
import Navbar from "../../commons/elements/bars/Navbar";
import {NavLink} from "react-router-dom";

const ConsoleReviewUserHeader = ({profile, paths}) => {
    return (
        <header className="console-header">
            {profile &&
            <div className="user-header">
                <Avatar className="user-image" userImage={profile.profile_image}/>
                <div className="user-info">
                    <h1>{profile.first_name} {profile.last_name} - {profile.email}</h1>
                </div>
            </div>}
            <Navbar>
                {/*<NavLink to={paths.profile}>Profile</NavLink>*/}
                <NavLink to={paths.recipes}>Recipes</NavLink>
                <NavLink to={paths.videos}>Videos</NavLink>
                <NavLink to={paths.blogs}>Blogs</NavLink>
            </Navbar>
        </header>
    )
}

export default ConsoleReviewUserHeader;