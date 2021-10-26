import React, {useContext} from "react";
import placeholderAvatar from "assets/user-image-default.png";
import profileBanner from "assets/profile-banner-default.png";
import {UserContext} from "../../../context/UserContext";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

const DashboardBanner = () => {
    const user = useContext(UserContext);

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
                        <em>{user.about_me}</em>
                    </div>

                </div>
                <div className="banner-content">
                    <ul>
                        {user.email &&
                        <li><FaEnvelope/> {user.email} </li>}
                        {user.phone_number &&
                        <li><FaPhoneAlt/> {user.phone_number} </li>}
                        {user.country &&
                        <li><FaHome/> {user.country} </li>}
                    </ul>
                    <ul>
                        {user.facebook_link &&
                        <li><FaFacebook/> {user.facebook_link} </li>}
                        {user.instagram_link &&
                        <li><FaInstagram/> {user.instagram_link} </li>}
                        <li><Link to="/update"><FaAngleRight/>Edit</Link></li>
                    </ul>
                </div>
                {/*<div className="banner-background" style={{backgroundImage: `url(${profileBanner})`}}>*/}
                {/*    <div className="banner-overlay"/>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default DashboardBanner;