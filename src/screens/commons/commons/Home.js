import React from "react";
import "./Home.css";
import {Link, NavLink} from "react-router-dom";
import Banner from "../../../components/home/Banner";
import Category from "../../../components/home/Category";
import Navbar from "../../../components/commons/Navbar";
import Sidebar from "../../../components/commons/Sidebar";
import {FaAngleRight} from "react-icons/fa";

const Home = () => {
    return (
        <div className="page-container">
            <Banner/>
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
                    <Category category="recipes" header="Check out these recipes!" to="/recipes"/>
                    <Category category="videos" header="Try these how-to videos" to="/videos"/>
                    <Category category="blogs" header="Stories to read" to="/blogs"/>
                </main>
                {/*Right sidebar*/}
                <aside className="aside-right">
                    <Sidebar>
                    </Sidebar>
                </aside>
            </div>
        </div>

    )
}

export default Home;