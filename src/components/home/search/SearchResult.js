import React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import ResultRecipes from "./result/ResultRecipes";
import ResultVideos from "./result/ResultVideos";
import ResultBlogs from "./result/ResultBlogs";

const SearchResult = ({data}) => {
    const location = useLocation();

    return (
        <Switch>
            <Route path="/search/recipes"><ResultRecipes data={data.listRecipe}/></Route>
            <Route path="/search/videos"><ResultVideos data={data.listVideo}/></Route>
            <Route path="/search/blogs"><ResultBlogs data={data.listBlog}/></Route>
            <Redirect to={{
                pathname: "/search/recipes",
                search: location.search,
            }}/>
        </Switch>
    )
}

export default SearchResult