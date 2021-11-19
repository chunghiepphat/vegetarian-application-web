import React, {useContext} from "react";
import "./Dashboard.css";
import DashboardLatestRecipes from "./dashboard/DashboardLatestRecipes";
import DashboardLatestBlogs from "./dashboard/DashboardLatestBlogs";
import DashboardSidebar from "./DashboardSidebar";
import DashboardBanner from "./dashboard/DashboardBanner";
import DashboardHealth from "./dashboard/DashboardHealth";
import {UserContext} from "../../context/UserContext";
import {useLocation} from "react-router-dom";
import DashboardRecommendations from "./dashboard/DashboardRecommendations";

const Dashboard = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    return (
        <div className="page-container">
            <DashboardBanner user={user} token={token} location={location}/>
            <div className="grid-container">
                <main>
                    <DashboardHealth user={user} token={token} location={location}/>
                    <DashboardRecommendations user={user} location={location}/>
                    <DashboardLatestRecipes user={user} token={token} location={location}/>
                    <DashboardLatestBlogs user={user} token={token} location={location}/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Dashboard;