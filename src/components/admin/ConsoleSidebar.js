import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const ConsoleSidebar = () => {
    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Community</h1>
                <Navbar>
                    <NavLink to="/console/manage-content"><FaAngleRight/>Moderate content</NavLink>
                    <NavLink to="/console/manage-members"><FaAngleRight/>Manage members</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Site</h1>
                <Navbar>
                    <NavLink to="/console/monitor-traffic"><FaAngleRight/>Monitor traffic</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default ConsoleSidebar;