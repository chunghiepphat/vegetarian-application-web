import React from "react";
import "./ProfileBanner.css";
import jwtDecode from "jwt-decode";
import placeholderAvatar from "assets/user-image-default.png";

const ProfileBanner = () => {
    let user = jwtDecode(localStorage.getItem("accessToken"));
    return (
        <section className="profile-banner">
            <picture className="profile-image">
                <source srcSet={user.image}/>
                <img src={placeholderAvatar} alt="avatar"/>
            </picture>
            <div className="profile-info">
                <h1>{user.first_name} {user.last_name}</h1>
                <i>"{user.about_me}"</i>
            </div>
        </section>
    )
}
export default ProfileBanner;