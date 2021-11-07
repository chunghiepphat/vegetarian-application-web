import React, {useContext} from "react";
import {NavLink, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import PostSidebar from "./PostSidebar";
import PostRecipe from "./post/PostRecipe";
import PostVideo from "./post/PostVideo";
import PostBlog from "./post/PostBlog";
import Navbar from "../commons/elements/bars/Navbar";

const Post = () => {
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const urlRecipe = "/post/recipe";
    const urlVideo = "/post/video";
    const urlBlog = "/post/blog";

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlRecipe}>Recipe</NavLink>
                            <NavLink to={urlVideo}>Video</NavLink>
                            <NavLink to={urlBlog}>Blog</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route path={urlRecipe}>
                            <PostRecipe user={user} token={token} history={history}/></Route>
                        <Route path={urlVideo}>
                            <PostVideo user={user} token={token} history={history}/></Route>
                        <Route path={urlBlog}>
                            <PostBlog user={user} token={token} history={history}/></Route>
                        <Route><Redirect to={urlRecipe}/></Route>
                    </Switch>
                </main>

                <PostSidebar/>
            </div>
        </div>
    )
}

export default Post;