import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {NavLink, Redirect} from "react-router-dom";

const ConsoleSearch = () => {
    return (
        <section>
            <header className="console-header">
                <h1>Search results</h1>
                <Navbar>
                    <NavLink to={`/console/search/recipes`}>Recipes</NavLink>
                    <NavLink to={`/console/search/videos`}>Videos</NavLink>
                    <NavLink to={`/console/search/blogs`}>Blogs</NavLink>
                    <NavLink to={`/console/search/users`}>Users</NavLink>
                    <Redirect to={`/console/search/recipes`}/>
                </Navbar>
            </header>
        </section>
    )
}

export default ConsoleSearch;