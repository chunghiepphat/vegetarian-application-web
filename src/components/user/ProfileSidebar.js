import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const ProfileSidebar = () => {
    // Gets user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Overview</h1>
                <Navbar>
                    <NavLink to={`/${user.id}/profile`}><FaAngleRight/>Your profile</NavLink>
                    <NavLink to={`/${user.id}/history`}><FaAngleRight/>Activity history</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Something to share?</h1>
                <Navbar>
                    <NavLink to="/post/recipe"><FaAngleRight/>Share a recipe</NavLink>
                    <NavLink to="/post/video"><FaAngleRight/>Share a video</NavLink>
                    <NavLink to="/post/blog"><FaAngleRight/>Share a story</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Useful tools</h1>
                <Navbar>
                    <Link to="/tools/bmi"><FaAngleRight/>Calculate BMI</Link>
                    <Link to="/tools/weekly-menu"><FaAngleRight/>Your weekly menu</Link>
                    <Link to="/nearby-stores"><FaAngleRight/>Find vegan stores</Link>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Settings</h1>
                <Navbar>
                    <NavLink to={`/${user.id}/edit-profile`}><FaAngleRight/>Edit your
                        profile</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(ProfileSidebar);