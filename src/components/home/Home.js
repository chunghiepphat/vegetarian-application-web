import React from "react";
import "./Home.css";
import HomeBanner from "./home/HomeBanner";
import HomeLatestRecipes from "./home/HomeLatestRecipes";
import HomeSidebar from "./HomeSidebar";
import HomeLatestBlogs from "./home/HomeLatestBlogs";
import HomeLatestVideos from "./home/HomeLatestVideos";

const Home = () => {

    return (
        <div className="page-container">
            <HomeBanner/>
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    {/*Recipe slider*/}
                    <HomeLatestRecipes/>
                    {/*Video showcase*/}
                    <HomeLatestVideos/>
                    {/*Story feed*/}
                    <HomeLatestBlogs/>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>
    )
}

export default Home;