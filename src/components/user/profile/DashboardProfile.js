import React, {useContext} from "react";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import {UserContext} from "../../../context/UserContext";

const DashboardProfile = () => {
    // Get user info
    const user = useContext(UserContext);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your profile</h1>
                <Link to="/update"><FaAngleRight/>Edit</Link>
            </header>
            <div className="section-content">
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
        </section>
    )
}
export default DashboardProfile;