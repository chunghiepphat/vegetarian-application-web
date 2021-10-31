import React from "react";
import Navbar from "../../commons/elements/bars/Navbar";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import RecipeList from "./content/RecipeList";
import VideoList from "./content/VideoList";
import BlogList from "./content/BlogList";

const ManageContent = () => {
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
                    <Route path={`/console/manage-content/recipes`}><RecipeList/></Route>
                    <Route path={`/console/manage-content/videos`}><VideoList/></Route>
                    <Route path={`/console/manage-content/blogs`}><BlogList/></Route>
                    <Route><Redirect to={`/console/manage-content/recipes`}/></Route>
                </Switch>
            </div>
        </section>
    )
}

export default ManageContent;