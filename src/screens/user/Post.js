import React from "react";
import "./Post.css";
import {Redirect, Route, Switch} from "react-router-dom";
import PostSidebar from "../../components/user/PostSidebar";
import PostRecipe from "../../components/user/post/PostRecipe";
import PostVideo from "../../components/user/post/PostVideo";
import PostBlog from "../../components/user/post/PostBlog";

const Post = () => {
    return (
        <div className="page-container">
            {/*Main container*/}
            <div className="grid-container">
                {/*Main view*/}
                <Switch>
                    <Route path="/post/recipe/" component={PostRecipe}/>
                    <Route exact path="/post/video" component={PostVideo}/>
                    <Route exact path="/post/blog" component={PostBlog}/>
                </Switch>
                {/*Right sidebar with additional info and controls*/}
                <PostSidebar/>
            </div>
        </div>
    )
}

export default Post;