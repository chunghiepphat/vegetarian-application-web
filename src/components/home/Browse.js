import React from "react";
import "./Home.css";
import {Redirect, Route, Switch} from "react-router-dom";
import HomeSidebar from "./HomeSidebar";
import BrowseRecipes from "./browse/BrowseRecipes";
import BrowseVideos from "./browse/BrowseVideos";
import BrowseBlogs from "./browse/BrowseBlogs";

const Browse = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <Switch>
                        <Route exact path="/browse/recipes" component={BrowseRecipes}/>
                        <Route exact path="/browse/videos" component={BrowseVideos}/>
                        <Route exact path="/browse/blogs" component={BrowseBlogs}/>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default Browse;