import React from "react";
import {Route, Switch} from "react-router-dom";
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
                    <Route path="/browse/recipes" component={BrowseRecipes}/>
                    <Route path="/browse/videos" component={BrowseVideos}/>
                    <Route path="/browse/blogs" component={BrowseBlogs}/>
                </Switch>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default Browse;