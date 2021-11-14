import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const ConsoleSidebar = () => {
    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Overview</h1>
                <Navbar>
                    <Link to="/console/"><FaAngleRight/>Dashboard</Link>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Manage</h1>
                <Navbar>
                    <NavLink to="/console/manage-content"><FaAngleRight/>Moderate content</NavLink>
                    <NavLink to="/console/manage-categories"><FaAngleRight/>Manage categories</NavLink>
                    <NavLink to="/console/manage-members"><FaAngleRight/>Manage members</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default ConsoleSidebar;