import React, {useContext} from "react";
import {postDisplayStrings} from "../../resources/UserDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {NavLink, withRouter} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import Sidebar from "../commons/elements/Sidebar";
import {FaAngleRight} from "react-icons/fa";


const PostSidebar = () => {
    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{postDisplayStrings.postSidebarHeader} {user.first_name} {user.last_name}</h1>
                <Navbar>
                    <NavLink to={`/profile`}><FaAngleRight/>{postDisplayStrings.postSidebarProfile}</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(PostSidebar);