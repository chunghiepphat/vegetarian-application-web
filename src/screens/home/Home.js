import React from "react";
import HomeBanner from "../../components/home/home/HomeBanner";
import HomeRecipes from "../../components/home/home/HomeRecipes";
import HomeSidebar from "../../components/home/HomeSidebar";
import HomeBlogs from "../../components/home/home/HomeBlogs";

const Home = () => {
    return (
        <div className="page-container">
            <HomeBanner/>
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <HomeRecipes/>
                    <HomeBlogs/>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>
    )
}

export default Home;