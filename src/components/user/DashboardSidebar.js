import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const DashboardSidebar = () => {
    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Overview</h1>
                <Navbar>
                    <NavLink to="/profile"><FaAngleRight/>Your profile</NavLink>
                    <NavLink to="/favorites"><FaAngleRight/>Your favorites</NavLink>
                    <NavLink to="/history"><FaAngleRight/>Your posts</NavLink>
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
                    <NavLink to="/health"><FaAngleRight/>Your health profile</NavLink>
                    <NavLink to="/menu"><FaAngleRight/>Your weekly menu</NavLink>
                    <NavLink to="/nearby-stores"><FaAngleRight/>Find vegan stores</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Settings</h1>
                <Navbar>
                    <NavLink to="/update"><FaAngleRight/>Edit your
                        profile</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(DashboardSidebar);