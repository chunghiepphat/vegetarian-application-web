import React from "react";
import Navbar from "../../commons/elements/Navbar";
import {NavLink} from "react-router-dom";
import ReactQuill from "react-quill";

const PostBlog = () => {
    return (
        <main>
            <section className="navbar-container">
                <Navbar>
                    <NavLink to="/post/recipe">Recipe</NavLink>
                    <NavLink to="/post/video">Video</NavLink>
                    <NavLink to="/post/blog">Blog</NavLink>
                </Navbar>
            </section>
            <section>
                <header className="section-header">
                    <h1>Blog post form</h1>
                    <ReactQuill theme="snow"/>
                </header>
                <div className="section-content">

                </div>
            </section>
        </main>
    )
}

export default PostBlog;