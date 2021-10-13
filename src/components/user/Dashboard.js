import React from "react";
import "./Dashboard.css";
import DashboardProfile from "./dashboard/DashboardProfile";
import DashboardRecipes from "./dashboard/DashboardRecipes";
import DashboardBlogs from "./dashboard/DashboardBlogs";
import DashboardSidebar from "./DashboardSidebar";
import DashboardBanner from "./dashboard/DashboardBanner";

const Dashboard = () => {
    return (
        <div className="page-container">
            <DashboardBanner/>
            <div className="grid-container">
                <main>
                    <DashboardRecipes/>
                    <DashboardBlogs/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Dashboard;