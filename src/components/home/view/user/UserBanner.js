import React from "react";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import Avatar from "../../../commons/elements/Avatar";

const UserBanner = ({data}) => {
    return (
        <div className="banner-container banner-user">
            {data &&
            <>
                <div className="banner">
                    <div className="banner-section">
                        <Avatar className="profile-image" userImage={data.profile_image}/>
                        <div className="profile-info">
                            <h1>{data.first_name} {data.last_name}</h1>
                            <em>{data.about_me}</em>
                        </div>
                    </div>
                    <div className="banner-section">
                        <ul>
                            {data.email &&
                            <li><FaEnvelope/> {data.email} </li>}
                            {data.phone_number &&
                            <li><FaPhoneAlt/> {data.phone_number} </li>}
                            {data.country &&
                            <li><FaHome/> {data.country} </li>}
                            {data.facebook_link &&
                            <li><FaFacebook/> {data.facebook_link} </li>}
                            {data.instagram_link &&
                            <li><FaInstagram/> {data.instagram_link} </li>}
                        </ul>
                    </div>
                </div>
                <div className="banner-background" style={{backgroundImage: `url(${data.profile_image})`}}>
                    <div className="banner-overlay"/>
                </div>
            </>}
        </div>
    )
}

export default UserBanner;