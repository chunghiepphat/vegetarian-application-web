import React from "react";
import LocalizedStrings from "react-localization";
import {Link, NavLink} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import Sidebar from "../commons/elements/Sidebar";
import {FaAngleRight} from "react-icons/fa";


const ConsoleSidebar = () => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            headerOverview: "Overview",
            urlDashboard: "Dashboard",
            headerManager: "Manage",
            urlContent: "Moderate content",
            urlCategories: "Manage categories",
            urlMembers: "Manage members",
        },
        vi: {
            headerOverview: "Tổng quan",
            urlDashboard: "Trang chính",
            headerManager: "Quản lý",
            urlContent: "Duyệt bài viết",
            urlCategories: "Quản lý danh mục",
            urlMembers: "Quản lý người dùng",
        }
    })
    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{strings.headerOverview}</h1>
                <Navbar>
                    <Link to="/console/"><FaAngleRight/>{strings.urlDashboard}</Link>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{strings.headerManager}</h1>
                <Navbar>
                    <NavLink to="/console/manage-content"><FaAngleRight/>{strings.urlContent}</NavLink>
                    <NavLink to="/console/manage-categories"><FaAngleRight/>{strings.urlCategories}</NavLink>
                    <NavLink to="/console/manage-members"><FaAngleRight/>{strings.urlMembers}</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default ConsoleSidebar;