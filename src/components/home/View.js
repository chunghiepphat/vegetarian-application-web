import React from "react";
import "./View.css";
import HomeSidebar from "./HomeSidebar";
import {Route, Switch} from "react-router-dom";
import ViewRecipe from "./view/ViewRecipe";
import ViewVideo from "./view/ViewVideo";
import ViewBlog from "./view/ViewBlog";
import ViewUser from "./view/ViewUser";

const View = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <Switch>
                        <Route path="/view/recipe/:id" component={ViewRecipe}/>
                        <Route path="/view/video/:id" component={ViewVideo}/>
                        <Route path="/view/blog/:id" component={ViewBlog}/>
                        <Route path="/view/user/:id" component={ViewUser}/>
                    </Switch>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default View;