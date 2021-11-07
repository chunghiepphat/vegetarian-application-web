import React, {useContext, useState} from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import PostedBlogs from "./history/PostedBlogs";
import PostedRecipes from "./history/PostedRecipes";
import PostedVideos from "./history/PostedVideos";
import DashboardSidebar from "./DashboardSidebar";
import {UserContext} from "../../context/UserContext";
import {apiBase} from "../../helpers/Helpers";

const History = () => {
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
        const response = await fetch(api, request);
        try {
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
                            <NavLink to={urlRecipes}>Your recipes</NavLink>
                            <NavLink to={urlVideos}>Your videos</NavLink>
                            <NavLink to={urlBlogs}>Your blogs</NavLink>
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