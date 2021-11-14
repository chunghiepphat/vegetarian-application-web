import React, {useContext, useEffect, useState} from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import FavoriteRecipes from "./favorites/FavoriteRecipes";
import FavoriteBlogs from "./favorites/FavoriteBlogs";
import {UserContext} from "../../context/UserContext";
import {apiBase} from "../../helpers/Variables";

const Favorites = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [recipes, setRecipes] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // Component URLS
    const urlRecipes = "/favorites/recipes";
    const urlBlogs = "/favorites/blogs";
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Generates request
    let request = {
        method: 'GET',
        headers: headers,
    };
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiBase}/user/${user.id}/liked`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                const result = await response.json();
                setRecipes(result.listRecipe);
                setBlogs(result.listBlog);
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
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlRecipes}>Your favorite recipes</NavLink>
                            <NavLink to={urlBlogs}>Your favorite blogs</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/favorites"><Redirect to={urlRecipes}/></Route>
                        <Route exact path={urlRecipes}>
                            <FavoriteRecipes data={recipes} user={user} location={location}
                                             isLoading={isLoading} isError={isError}
                                             fetchData={fetchData}/> </Route>
                        <Route exact path={urlBlogs}>
                            <FavoriteBlogs data={blogs} user={user} location={location}
                                           isLoading={isLoading} isError={isError}
                                           fetchData={fetchData}/> </Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Favorites;