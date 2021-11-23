import React, {useContext, useState} from "react";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "../commons/elements/bars/Navbar";
import PostedRecipes from "./history/PostedRecipes";
import PostedVideos from "./history/PostedVideos";
import PostedBlogs from "./history/PostedBlogs";
import LocalizedStrings from "react-localization";

const History = () => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            recipeHistory: "Your recipes",
            videoHistory: "Your videos",
            blogHistory: "Your blogs",
        },
        vi: {
            recipeHistory: "Công thức",
            videoHistory: "Video",
            blogHistory: "Bài viết",
        }
    });

    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    // URL variables
    const urlRecipes = "/history/recipes";
    const urlVideos = "/history/videos";
    const urlBlogs = "/history/blogs";
    // Data states
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchData = async (api) => {
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };
        try {
            const response = await fetch(api, request);
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
        }
    }

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlRecipes}>{strings.recipeHistory}</NavLink>
                            <NavLink to={urlVideos}>{strings.videoHistory}</NavLink>
                            <NavLink to={urlBlogs}>{strings.blogHistory}</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/history"><Redirect to={urlRecipes}/></Route>
                        <Route exact path={urlRecipes}>
                            <PostedRecipes user={user} location={location} data={data}
                                           isLoading={isLoading} isError={isError}
                                           fetchData={fetchData}/></Route>
                        <Route exact path={urlVideos}>
                            <PostedVideos user={user} location={location} data={data}
                                          isLoading={isLoading} isError={isError}
                                          fetchData={fetchData}/></Route>
                        <Route exact path={urlBlogs}>
                            <PostedBlogs user={user} location={location} data={data}
                                         isLoading={isLoading} isError={isError}
                                         fetchData={fetchData}/></Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default History;