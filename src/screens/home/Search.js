import React from "react";
import "./Home.css";
import SearchResultRecipes from "../../components/home/search/result/SearchResultRecipes";
import SearchSidebar from "../../components/home/SearchSidebar";
import Navbar from "../../components/commons/elements/bars/Navbar";
import {NavLink} from "react-router-dom";
import SearchForm from "../../components/home/search/SearchForm";

const Search = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <section>
                        <SearchForm/>
                    </section>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to="/post/recipe">Recipe</NavLink>
                            <NavLink to="/post/video">Video</NavLink>
                            <NavLink to="/post/blog">Blog</NavLink>
                        </Navbar>
                    </section>
                    <SearchResultRecipes/>
                </main>
                {/*Right sidebar*/}
                <SearchSidebar/>
            </div>
        </div>

    )
}

export default Search;