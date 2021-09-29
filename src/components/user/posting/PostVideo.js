import React from "react";
import Navbar from "../../commons/elements/Navbar";
import {NavLink} from "react-router-dom";

const PostVideo = () => {
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
                    <h1>Video post form</h1>
                </header>
                <div className="section-content">

                </div>
            </section>
        </main>
    )
}

export default PostVideo;