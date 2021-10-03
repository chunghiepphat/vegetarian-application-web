import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const PostSidebar = () => {
    // Gets user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Posting as {user.first_name} {user.last_name}</h1>
                <Navbar>
                    <NavLink to={`/${user.id}/profile`}><FaAngleRight/>Your profile</NavLink>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(PostSidebar);