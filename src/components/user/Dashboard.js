import React from "react";
import "./Dashboard.css";
import DashboardProfile from "./profile/DashboardProfile";
import DashboardRecipes from "./profile/DashboardRecipes";
import DashboardBlogs from "./profile/DashboardBlogs";
import DashboardSidebar from "./DashboardSidebar";
import DashboardBanner from "./profile/DashboardBanner";

const Dashboard = () => {
    return (
        <div className="page-container">
            <DashboardBanner/>
            <div className="grid-container">
                <main>
                    <DashboardProfile/>
                    <DashboardRecipes/>
                    <DashboardBlogs/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Dashboard;