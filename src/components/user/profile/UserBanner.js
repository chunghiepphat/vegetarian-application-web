import React from "react";
import placeholderAvatar from "assets/user-image-default.png";
import profileBanner from "assets/profile-banner-default.png";

const UserBanner = () => {
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div className="banner-container">
            <div className="profile-banner">
                <div className="banner-content">
                    <picture className="profile-image">
                        <source srcSet={user.profile_image}/>
                        <img src={placeholderAvatar} alt="avatar"/>
                    </picture>
                    <div className="profile-info">
                        <h1>{user.first_name} {user.last_name}</h1>
                        <i>"{user.about_me}"</i>
                    </div>
                </div>
                <div className="banner-background" style={{backgroundImage: `url(${profileBanner})`}}>
                    <div className="banner-overlay"/>
                </div>
            </div>
        </div>
    )
}

export default UserBanner;