import React, {useContext} from "react";
import {dashboardDisplayStrings} from "../../resources/UserDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {NavLink, withRouter} from "react-router-dom";
import Sidebar from "../commons/elements/Sidebar";
import Navbar from "../commons/elements/bars/Navbar";
import {FaAngleRight} from "react-icons/fa";

const DashboardSidebar = () => {
    // Localizations
    dashboardDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{dashboardDisplayStrings.dashboardSidebarMain}</h1>
                <Navbar>
                    <NavLink to="/profile">
                        <FaAngleRight/>{dashboardDisplayStrings.dashboardSidebarMainDashboard}
                    </NavLink>
                    <NavLink to="/menu">
                        <FaAngleRight/>{dashboardDisplayStrings.dashboardSidebarMainWeeklyMenu}
                    </NavLink>
                    <NavLink to="/favorites">
                        <FaAngleRight/>{dashboardDisplayStrings.dashboardSidebarMainFavoritePosts}
                    </NavLink>
                    <NavLink to="/history">
                        <FaAngleRight/>{dashboardDisplayStrings.dashboardSidebarMainPostHistory}
                    </NavLink>
                    <NavLink to="/drafts">
                        <FaAngleRight/>{dashboardDisplayStrings.dashboardSidebarMainPostDrafts}
                    </NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{dashboardDisplayStrings.dashboardSidebarShare}</h1>
                <Navbar>
                    <NavLink to="/post/recipe">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarShareRecipe}
                    </NavLink>
                    <NavLink to="/post/video">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarPostVideo}
                    </NavLink>
                    <NavLink to="/post/blog">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarPostBlog}
                    </NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{dashboardDisplayStrings.dashboardSidebarSettings}</h1>
                <Navbar>
                    <NavLink to="/health/details">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarSettingsHealth}
                    </NavLink>
                    <NavLink to="/health/allergies">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarSettingsFoodAllergies}
                    </NavLink>
                    <NavLink to="/health/preferences">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarSettingsFoodPreferences}
                    </NavLink>
                    <NavLink to="/update">
                        <FaAngleRight/> {dashboardDisplayStrings.dashboardSidebarSettingsAccount}
                    </NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(DashboardSidebar);