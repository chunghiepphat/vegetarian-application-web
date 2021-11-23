import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";
import LocalizedStrings from "react-localization";

const DashboardSidebar = () => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            dashboardHeader: "Dashboard",
            overview: "Overview",
            weeklyMenu: "Your weekly menu",
            favoritePost: "Your favorite posts",
            historyPost: "Your post history",
            drafts: "Your drafts",
            shareHeader: "Something to share?",
            postRecipe: "Share a recipe",
            postVideo: "Share a video",
            postBlog: "Share a story",
            toolSettings: "Tools & settings",
            healthProfile: "Manage health profile",
            foodAllergies: "Manage food allergies",
            foodPreferences: "Manage food preferences",
            editAccount: "Edit account details",
        },
        vi: {
            dashboardHeader: "Trang chính",
            overview: "Tổng quan",
            weeklyMenu: "Thực đơn của bạn",
            favoritePost: "Các bài đã thích",
            historyPost: "Lịch sử đăng bài",
            drafts: "Bản nháp đã lưu",
            shareHeader: "Bạn muốn chia sẻ gì?",
            postRecipe: "Chia sẻ công thức nấu ăn",
            postVideo: "Chia sẻ video hướng dẫn",
            postBlog: "Chia sẻ bài viết",
            toolSettings: "Công cụ và cài đặt",
            healthProfile: "Quản lý hồ sơ sức khỏe",
            foodAllergies: "Quản lý thực phẩm dị ứng",
            foodPreferences: "Quản lý thực phẩm yêu thích",
            editAccount: "Chỉnh sửa tài khoản",
        }
    });

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{strings.dashboardHeader}</h1>
                <Navbar>
                    <NavLink to="/profile"><FaAngleRight/>{strings.overview}</NavLink>
                    <NavLink to="/menu"><FaAngleRight/>{strings.weeklyMenu}</NavLink>
                    <NavLink to="/favorites"><FaAngleRight/>{strings.favoritePost}</NavLink>
                    <NavLink to="/history"><FaAngleRight/>{strings.historyPost}</NavLink>
                    <NavLink to="/drafts"><FaAngleRight/>{strings.drafts}</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{strings.shareHeader}</h1>
                <Navbar>
                    <NavLink to="/post/recipe"><FaAngleRight/>{strings.postRecipe}</NavLink>
                    <NavLink to="/post/video"><FaAngleRight/>{strings.postVideo}</NavLink>
                    <NavLink to="/post/blog"><FaAngleRight/>{strings.postBlog}</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{strings.toolSettings}</h1>
                <Navbar>

                    <NavLink to="/health/details"><FaAngleRight/>{strings.healthProfile}</NavLink>
                    <NavLink to="/health/allergies"><FaAngleRight/>{strings.foodAllergies}</NavLink>
                    <NavLink to="/health/preferences"><FaAngleRight/>{strings.foodPreferences}</NavLink>
                    <NavLink to="/update"><FaAngleRight/>{strings.editAccount}</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(DashboardSidebar);