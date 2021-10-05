import React from "react";
import "./Home.css";
import HomeBanner from "./home/HomeBanner";
import HomeRecipes from "./home/HomeRecipes";
import HomeSidebar from "./HomeSidebar";
import HomeBlogs from "./home/HomeBlogs";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="page-container">
            <HomeBanner/>
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    {/*Recipe slider*/}
                    <HomeRecipes/>
                    {/*Create content button*/}
                    <section>
                        <div className="section-content">
                            <Link className="button-link" to="/post/recipe">Have a recipe? Share with us!</Link>
                        </div>
                    </section>
                    {/*Story feed*/}
                    <HomeBlogs/>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>
    )
}

export default Home;