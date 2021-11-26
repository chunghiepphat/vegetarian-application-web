import React, {useContext, useState} from "react";
import {historyDisplayStrings} from "../../resources/UserDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {UserContext} from "../../context/UserContext";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "../commons/elements/bars/Navbar";
import PostedRecipes from "./history/PostedRecipes";
import PostedVideos from "./history/PostedVideos";
import PostedBlogs from "./history/PostedBlogs";


const History = () => {
    // Localizations
    historyDisplayStrings.setLanguage(useContext(LocaleContext));

    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // URL variables
    const urlRecipes = "/history/recipes";
    const urlVideos = "/history/videos";
    const urlBlogs = "/history/blogs";

    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchData = async (api, setData, setIsLoading, setIsError) => {
        setIsLoading(true);
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
            setIsError(true);
            setIsLoading(false);
        }
    }

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlRecipes}>{historyDisplayStrings.historyTabsRecipes}</NavLink>
                            <NavLink to={urlVideos}>{historyDisplayStrings.historyTabsVideos}</NavLink>
                            <NavLink to={urlBlogs}>{historyDisplayStrings.historyTabsBlogs}</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/history"><Redirect to={urlRecipes}/></Route>
                        <Route exact path={urlRecipes}>
                            <PostedRecipes user={user} fetchData={fetchData}/></Route>
                        <Route exact path={urlVideos}>
                            <PostedVideos user={user} fetchData={fetchData}/></Route>
                        <Route exact path={urlBlogs}>
                            <PostedBlogs user={user} fetchData={fetchData}/></Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default History;