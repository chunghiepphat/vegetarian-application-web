import React from "react";
import placeholderAvatar from "assets/user-image-default.png";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import {MdEdit} from "react-icons/all";
import LocalizedStrings from "react-localization";

const DashboardBanner = ({user}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            editButton: "Edit"
        },
        vi: {
            editButton: "Chỉnh sửa"
        }
    });

    return (
        <div className="banner-container banner-dashboard">
            <div className="banner">
                <div className="banner-section">
                    <Link className="avatar-link" to="/update/avatar" style={{position: "relative"}}>
                        <picture className="profile-image">
                            <source srcSet={user.profile_image}/>
                            <img src={placeholderAvatar} alt="avatar"/>
                        </picture>
                        <div className="avatar-overlay">
                            <MdEdit/>
                        </div>
                    </Link>
                    <div className="profile-info">
                        <h1>{user.first_name} {user.last_name}</h1>
                        <em>{user.about_me}</em>
                    </div>
                </div>
                <div className="banner-section">
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
                        <li><Link to="/update"><FaAngleRight/>{strings.editButton}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="banner-overlay"/>
            <div className="banner-background" style={{backgroundImage: `url(${user.profile_image})`}}/>
        </div>
    )
}

export default DashboardBanner;