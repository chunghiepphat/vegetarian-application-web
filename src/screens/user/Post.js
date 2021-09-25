import React from "react";
import "./Post.css";
import {Redirect, Route, Switch} from "react-router-dom";
import PostSidebar from "../../components/user/PostSidebar";
import PostRecipe from "../../components/user/posting/PostRecipe";
import PostVideo from "../../components/user/posting/PostVideo";
import PostBlog from "../../components/user/posting/PostBlog";

const Post = () => {
    return (
        <div className="page-container">
            {/*Main container*/}
            <div className="grid-container">
                {/*Main view*/}
                <Switch>
                    <Route exact path="/post/recipe" component={() => (<Redirect to='/post/recipe/step-1'/>)}/>
                    <Route exact path="/post/recipe/step-1" component={PostRecipe}/>
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