import React from "react";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import PostSidebar from "./PostSidebar";
import PostRecipe from "./post/PostRecipe";
import PostVideo from "./post/PostVideo";
import PostBlog from "./post/PostBlog";
import Navbar from "../commons/elements/bars/Navbar";

const Post = () => {
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
                        <Route path={urlRecipe}><PostRecipe/></Route>
                        <Route path={urlVideo}><PostVideo/></Route>
                        <Route exact path={urlBlog}><PostBlog/></Route>
                    </Switch>
                </main>

                <PostSidebar/>
            </div>
        </div>
    )
}

export default Post;