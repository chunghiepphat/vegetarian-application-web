import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/UserContext";
import Navbar from "../../commons/elements/bars/Navbar";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import RecipeList from "./content/RecipeList";
import VideoList from "./content/VideoList";
import BlogList from "./content/BlogList";


const ManageContent = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    // const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = async (api, data, setData) => {
        setIsError(false);
        setIsLoading(true);
        let headers = new Headers();
        if (token) headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        }
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
            setIsLoading(false);
        }
    }

    return (
        <section>
            <header className="console-header">
                <h1>Content submitted by the community</h1>
                <Navbar>
                    <NavLink to={`/console/manage-content/recipes`}>Recipes</NavLink>
                    <NavLink to={`/console/manage-content/videos`}>Videos</NavLink>
                    <NavLink to={`/console/manage-content/blogs`}>Blogs</NavLink>
                </Navbar>
            </header>
            <div className="console-content">
                <Switch>
                    <Route path={`/console/manage-content/recipes`}>
                        <RecipeList user={user} location={location}
                                    isLoading={isLoading} isError={isError}
                                    fetchData={fetchData}/> </Route>
                    <Route path={`/console/manage-content/videos`}>
                        <VideoList user={user} location={location}
                                   isLoading={isLoading} isError={isError}
                                   fetchData={fetchData}/> </Route>
                    <Route path={`/console/manage-content/blogs`}>
                        <BlogList user={user} location={location}
                                  isLoading={isLoading} isError={isError}
                                  fetchData={fetchData}/> </Route>
                    <Route><Redirect to={`/console/manage-content/recipes`}/></Route>
                </Switch>
            </div>
        </section>
    )
}

export default ManageContent;