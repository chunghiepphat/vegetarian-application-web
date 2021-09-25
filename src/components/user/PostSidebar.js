import React from "react";
import Navbar from "../commons/elements/Navbar";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";

const PostSidebar = () => {
    // Gets user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <aside>
            <Sidebar>
                <section className="sidebar-widget">
                    <h1>Posting as {user.first_name} {user.last_name}</h1>
                    <Navbar>
                        <NavLink to={`/${user.id}/profile`}><FaAngleRight/>Your profile</NavLink>
                    </Navbar>
                </section>
                <section className="sidebar-widget">
                    <h1>Steps</h1>
                    <Navbar>
                        <NavLink to="/placeholder"><FaAngleRight/>Step 1</NavLink>
                        <NavLink to="/placeholder"><FaAngleRight/>Step 2</NavLink>
                        <NavLink to="/placeholder"><FaAngleRight/>Step 3</NavLink>
                    </Navbar>
                </section>
            </Sidebar>
        </aside>
    )
}

export default withRouter(PostSidebar);