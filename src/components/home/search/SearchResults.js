import React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import ResultRecipes from "./result/ResultRecipes";
import ResultVideos from "./result/ResultVideos";
import ResultBlogs from "./result/ResultBlogs";

const SearchResults = ({data}) => {
    const location = useLocation();

    return (
        <Switch>
            {data.listRecipe && data.listRecipe.length > 0 &&
            <Route path="/search/recipes"><ResultRecipes data={data.listRecipe}/></Route>}
            {data.listVideo && data.listVideo.length > 0 &&
            <Route path="/search/videos"><ResultVideos data={data.listVideo}/></Route>}
            {data.listBlog && data.listBlog.length > 0 &&
            <Route path="/search/blogs"><ResultBlogs data={data.listBlog}/></Route>}
            {data.listRecipe && data.listRecipe.length > 0 &&
            <Redirect to={{
                pathname: "/search/recipes",
                search: location.search,
            }}/>}
            {data.listVideo && data.listVideo.length > 0 &&
            <Redirect to={{
                pathname: "/search/videos",
                search: location.search,
            }}/>}
            {data.listBlog && data.listBlog.length > 0 &&
            <Redirect to={{
                pathname: "/search/blogs",
                search: location.search,
            }}/>}
        </Switch>
    )
}

export default SearchResults