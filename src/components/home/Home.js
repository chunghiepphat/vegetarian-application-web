import React, {useContext} from "react";
import "./Home.css";
import {useLocation} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import HomeSidebar from "./HomeSidebar";
import HomeBanner from "./home/HomeBanner";
import HomeLatestRecipes from "./home/HomeLatestRecipes";
import HomeLatestVideos from "./home/HomeLatestVideos";
import HomeLatestBlogs from "./home/HomeLatestBlogs";

const Home = () => {
    const location = useLocation();
    const user = useContext(UserContext);

    return (
        <div className="page-container">
            <HomeBanner user={user} location={location}/>
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <HomeLatestRecipes user={user} location={location}/>
                    <HomeLatestVideos user={user} location={location}/>
                    <HomeLatestBlogs user={user} location={location}/>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>
    )
}

export default Home;