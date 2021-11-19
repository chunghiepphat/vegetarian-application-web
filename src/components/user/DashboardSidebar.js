import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const DashboardSidebar = () => {
    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Dashboard</h1>
                <Navbar>
                    <NavLink to="/profile"><FaAngleRight/>Overview</NavLink>
                    <NavLink to="/menu"><FaAngleRight/>Your weekly menu</NavLink>
                    <NavLink to="/favorites"><FaAngleRight/>Your favorite posts</NavLink>
                    <NavLink to="/history"><FaAngleRight/>Your post history</NavLink>
                    <NavLink to="/drafts"><FaAngleRight/>Your drafts</NavLink>
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
                <h1>Tools & settings</h1>
                <Navbar>

                    <NavLink to="/health/details"><FaAngleRight/>Manage health profile</NavLink>
                    <NavLink to="/health/allergies"><FaAngleRight/>Manage food allergies</NavLink>
                    <NavLink to="/health/preferences"><FaAngleRight/>Manage food preferences</NavLink>
                    <NavLink to="/update"><FaAngleRight/>Edit account details</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(DashboardSidebar);