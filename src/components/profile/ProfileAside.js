import React from "react";
import Navbar from "../commons/Navbar";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/Sidebar";
import jwtDecode from "jwt-decode";

const ProfileAside = (props) => {
    // Gets user info
    let token = localStorage.getItem("accessToken");
    let user = jwtDecode(token);

    return (
        <Sidebar>
            <Navbar>
                <NavLink to={`/profile/${user.id}`}><FaAngleRight/>Your profile</NavLink>
            </Navbar>
            <h1>Something to share?</h1>
            <Navbar>
                <NavLink to="/post-recipe"><FaAngleRight/>Share a recipe</NavLink>
                <NavLink to="/post-video"><FaAngleRight/>Share a video</NavLink>
                <NavLink to="/post-blog"><FaAngleRight/>Share a story</NavLink>
            </Navbar>
            <h1>Useful tools</h1>
            <Navbar>
                <Link to="/bmi"><FaAngleRight/>Calculate BMI</Link>
                <Link to="/weekly-menu"><FaAngleRight/>Your weekly menu</Link>
                <Link to="/nearby-stores"><FaAngleRight/>Find vegan stores</Link>
            </Navbar>
            <h1>Settings</h1>
            <Navbar>
                <NavLink to={`${props.match.url}/edit-profile`}><FaAngleRight/>Edit your
                    profile</NavLink>
            </Navbar>
        </Sidebar>
    )
}

export default withRouter(ProfileAside);