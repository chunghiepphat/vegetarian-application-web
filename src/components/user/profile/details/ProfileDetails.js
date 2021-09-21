import React from "react";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import ProfileDetailsRecipes from "./ProfileDetailsRecipes";
import ProfileDetailsBlogs from "./ProfileDetailsBlogs";

const ProfileDetails = () => {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <main>
            <section>
                <header className="section-header linked-header">
                    <h1>Your profile</h1>
                    <Link to={`/${user.id}/edit-profile`}><FaAngleRight/>Edit</Link>
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
            <ProfileDetailsRecipes/>
            <ProfileDetailsBlogs/>
        </main>
    )
}
export default ProfileDetails;