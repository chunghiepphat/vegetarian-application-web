import React, {useContext, useEffect, useState} from "react";
import OverviewCard from "./elements/OverviewCard";
import Panel from "../commons/elements/containers/Panel";
import {apiBase} from "../../helpers/Variables";
import {UserContext} from "../../context/UserContext";
import {useLocation} from "react-router-dom";

const ConsoleHome = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [recipes, setRecipes] = useState(0);
    const [videos, setVideos] = useState(0);
    const [blogs, setBlogs] = useState(0);
    const [recipeCount, setRecipeCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };
        try {
            const api = `${apiBase}/list/noapprove`;
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setRecipes(result.listRecipe);
                setVideos(result.listVideo);
                setBlogs(result.listBlog);
                console.log(recipes)
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
    useEffect(() => {
        fetchData();
    }, [location, user]);

    return (
        <section>
            <div className="console-content">
                <Panel filler="overview-card">
                    <OverviewCard url={"/console/manage-content/recipes"}
                                  number={40} text={"New recipes"} action={"Review"}/>
                    <OverviewCard url={"/console/manage-content/videos"}
                                  number={22} text={"New videos"} action={"Review"}/>
                    <OverviewCard url={"/console/manage-content/blogs"}
                                  number={16} text={"New blogs"} action={"Review"}/>
                </Panel>
                <Panel filler="overview-card">
                    <OverviewCard url={"/console/manage-categories"}
                                  text={"Categories"} action={"Manage"}/>
                    <OverviewCard url={"/console/manage-members"}
                                  text={"Members"} action={"Manage"}/>
                </Panel>
            </div>
        </section>
    )
}

export default ConsoleHome;