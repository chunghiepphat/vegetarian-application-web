import React, {useContext} from "react";
import "./Home.css";
import {UserContext} from "../../context/UserContext";
import HomeSidebar from "./HomeSidebar";
import HomeBanner from "./home/HomeBanner";
import HomeLatestRecipes from "./home/HomeLatestRecipes";
import HomeLatestVideos from "./home/HomeLatestVideos";
import HomeLatestBlogs from "./home/HomeLatestBlogs";

const Home = () => {
    const user = useContext(UserContext);
    const fetchData = async (api, setData, setIsLoading, setIsError) => {
        setIsError(false);
        setIsLoading(true);
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setIsLoading(false);
        }
    }

    return (
        <div className="page-container">
            <HomeBanner user={user} fetchData={fetchData}/>
            <div className="grid-container">
                <main>
                    <HomeLatestRecipes user={user} fetchData={fetchData}/>
                    <HomeLatestVideos user={user} fetchData={fetchData}/>
                    <HomeLatestBlogs user={user} fetchData={fetchData}/>
                </main>
                <HomeSidebar/>
            </div>
        </div>
    )
}

export default Home;