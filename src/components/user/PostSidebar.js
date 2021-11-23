import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";
import LocalizedStrings from "react-localization";

const PostSidebar = () => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            postingHeader: "Posting as",
            profileSidebar: "Your profile"
        },
        vi: {
            postingHeader: "Được đăng bởi",
            profileSidebar: "Hồ sơ của bạn"
        }
    });

    // Gets user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{strings.postingHeader} {user.first_name} {user.last_name}</h1>
                <Navbar>
                    <NavLink to={`/profile`}><FaAngleRight/>{strings.profileSidebar}</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(PostSidebar);