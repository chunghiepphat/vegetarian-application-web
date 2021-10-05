import React, {useEffect, useState} from "react";
import "./Home.css";
import SearchSidebar from "./SearchSidebar";
import SearchResult from "./search/SearchResult";
import {apiPattern} from "../../helpers/Helpers";
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import Navbar from "../commons/elements/bars/Navbar";
import ResultRecipes from "./search/result/ResultRecipes";
import ResultBlogs from "./search/result/ResultBlogs";

const Search = () => {
    const location = useLocation();
    const api = `${apiPattern}/home/find${location.search}`;
    const [recipe, setRecipe] = useState([]);
    const [blog, setBlog] = useState([]);

    console.log(location.search)
    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setRecipe(result.listRecipe);
            setBlog(result.listBlog);
        }
        fetchData();
    }, []);

    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={{
                                pathname: "/search/recipes",
                                search: location.search,
                                state: {data: recipe}
                            }}>Recipe</NavLink>
                            <NavLink to={{
                                pathname: "/search/videos",
                                search: location.search
                            }}>Video</NavLink>
                            <NavLink to={{
                                pathname: "/search/blogs",
                                search: location.search,
                                state: {data: blog}
                            }}>Blog</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route path="/search/recipes"><ResultRecipes/></Route>
                        <Route path="/search/blogs"><ResultBlogs/></Route>
                    </Switch>
                </main>
                {/*Right sidebar*/}
                <SearchSidebar/>
            </div>
        </div>

    )
}

export default Search;