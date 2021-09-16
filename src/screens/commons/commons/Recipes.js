import React from "react";
import "./Home.css";
import {Link, NavLink} from "react-router-dom";
import Navbar from "../../../components/commons/Navbar";
import Sidebar from "../../../components/commons/Sidebar";
import {FaAngleRight} from "react-icons/fa";

const Recipes = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Left sidebar*/}
                <aside className="aside-left">
                    <Sidebar>
                        <h1>Explore around</h1>
                        <Navbar>
                            <NavLink to="/recipes"><FaAngleRight/>Recipes</NavLink>
                            <NavLink to="/videos"><FaAngleRight/>Videos</NavLink>
                            <NavLink to="/blogs"><FaAngleRight/>Blogs</NavLink>
                        </Navbar>
                        <h1>Try these</h1>
                        <Navbar>
                            <Link to="/recipes/main-courses"><FaAngleRight/>Main courses</Link>
                            <Link to="/recipes/soups"><FaAngleRight/>Soups</Link>
                            <Link to="/recipes/snacks"><FaAngleRight/>Snacks</Link>
                            <Link to="/recipes/desserts"><FaAngleRight/>Desserts</Link>
                        </Navbar>
                        <h1>Something fancy?</h1>
                        <Navbar>
                            <NavLink to="/search"><FaAngleRight/>Advanced search</NavLink>
                        </Navbar>
                    </Sidebar>
                </aside>
                {/*Main content*/}
                <main>
                    <h1>Recipes page placeholder</h1>
                </main>
                {/*Right sidebar*/}
                <aside className="aside-right">
                </aside>
            </div>
        </div>

    )
}

export default Recipes;