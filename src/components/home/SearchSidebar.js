import React from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";
import Navbar from "../commons/elements/Navbar";

const SearchSidebar = () => {
    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Explore</h1>
                <Navbar>
                    <NavLink to="/browse/recipes"><FaAngleRight/>Recipes</NavLink>
                    <NavLink to="/browse/videos"><FaAngleRight/>Videos</NavLink>
                    <NavLink to="/browse/blogs"><FaAngleRight/>Blogs</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Search</h1>
                <Navbar>
                    <NavLink to="/search"><FaAngleRight/>Advanced search</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Try these</h1>
                <Navbar>
                    <Link to="/tags/main-courses"><FaAngleRight/>Main courses</Link>
                    <Link to="/tags/soups"><FaAngleRight/>Soups</Link>
                    <Link to="/tags/snacks"><FaAngleRight/>Snacks</Link>
                    <Link to="/tags/desserts"><FaAngleRight/>Desserts</Link>
                </Navbar>
            </section>
        </Sidebar>
    )
}

export default withRouter(SearchSidebar);