import React from "react";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import DashboardRecipes from "./dashboard/DashboardRecipes";
import DashboardBlogs from "./dashboard/DashboardBlogs";

const UserDashboard = () => {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <main>
            <section>
                <header className="section-header linked-header">
                    <h1>Your profile</h1>
                    <Link to={`/${user.id}/update`}><FaAngleRight/>Edit</Link>
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
            <DashboardRecipes/>
            <DashboardBlogs/>
        </main>
    )
}
export default UserDashboard;