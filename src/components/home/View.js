import React from "react";
import "./View.css";
import HomeSidebar from "./HomeSidebar";
import {Route, Switch} from "react-router-dom";
import ViewRecipe from "./view/ViewRecipe";
import ViewBlog from "./view/ViewBlog";

const View = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <Switch>
                        <Route path="/view/recipe/:id" component={ViewRecipe}/>
                        <Route exact path="/view/blog/:id" component={ViewBlog}/>
                    </Switch>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default View;