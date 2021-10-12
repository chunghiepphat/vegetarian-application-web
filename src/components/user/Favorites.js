import React, {useContext, useEffect, useState} from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, NavLink, Redirect, Route, Switch} from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import FavoriteRecipes from "./favorites/FavoriteRecipes";
import FavoriteBlogs from "./favorites/FavoriteBlogs";
import {UserContext} from "../../context/UserContext";
import {apiBase} from "../../helpers/Helpers";

const Favorites = () => {
    const urlRecipes = "/favorites/recipes";
    const urlBlogs = "/favorites/blogs";

    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/user/${user.id}/liked`;
    const [recipes, setRecipes] = useState([]);
    const [blogs, setBlogs] = useState([]);

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            // Generates request
            let request = {
                method: 'GET',
                headers: headers,
            };
            const response = await fetch(api, request);
            const result = await response.json();
            setRecipes(result.listRecipe);
            setBlogs(result.listBlog);
        }
        fetchData();
    }, []);

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
                        <Route exact path={urlRecipes}><FavoriteRecipes data={recipes}/></Route>
                        <Route exact path={urlBlogs}><FavoriteBlogs data={blogs}/></Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Favorites;