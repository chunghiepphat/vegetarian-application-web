import React from "react";
import "./Dashboard.css";
import DashboardLatestRecipes from "./dashboard/DashboardLatestRecipes";
import DashboardLatestBlogs from "./dashboard/DashboardLatestBlogs";
import DashboardSidebar from "./DashboardSidebar";
import DashboardBanner from "./dashboard/DashboardBanner";
import DashboardHealth from "./dashboard/DashboardHealth";

const Dashboard = () => {
    return (
        <div className="page-container">
            <DashboardBanner/>
            <div className="grid-container">
                <main>
                    <DashboardHealth/>
                    <DashboardLatestRecipes/>
                    <DashboardLatestBlogs/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Dashboard;