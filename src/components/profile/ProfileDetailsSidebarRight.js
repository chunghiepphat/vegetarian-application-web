import React from "react";
import {withRouter} from "react-router-dom";
import {FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import jwtDecode from "jwt-decode";

const ProfileDetailsSidebarRight = () => {
    // Gets user info
    let token = localStorage.getItem("accessToken");
    let user = jwtDecode(token);

    return (
        <div>
            <h1>Contact info</h1>
            <ul>
                <li><FaEnvelope/>{user.email} </li>
                <li><FaPhoneAlt/>{user.phone_number} </li>
                <li><FaHome/>{user.country} </li>
            </ul>
            <h1>Social media</h1>
            <ul>
                <li><FaFacebook/>{user.facebook_link} </li>
                <li><FaInstagram/>{user.instagram_link} </li>
            </ul>
        </div>
    )
}

export default withRouter(ProfileDetailsSidebarRight);