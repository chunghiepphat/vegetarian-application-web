import React from "react";
import "./Home.css";
import {Redirect, Route, Switch} from "react-router-dom";
import HomeSidebar from "../../components/home/HomeSidebar";
import BrowseRecipes from "../../components/home/browse/BrowseRecipes";
import BrowseVideos from "../../components/home/browse/BrowseVideos";
import BrowseBlogs from "../../components/home/browse/BrowseBlogs";

const Browse = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <Switch>
                    <Route exact path="/browse/recipes" component={BrowseRecipes}/>
                    <Route exact path="/browse/videos" component={BrowseVideos}/>
                    <Route exact path="/browse/blogs" component={BrowseBlogs}/>
                    <Route><Redirect to="/not-found"/></Route>
                </Switch>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default Browse;