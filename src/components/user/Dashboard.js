import React from "react";
import "./Dashboard.css";
import DashboardRecipes from "./dashboard/DashboardRecipes";
import DashboardBlogs from "./dashboard/DashboardBlogs";
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
                    <DashboardRecipes/>
                    <DashboardBlogs/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Dashboard;