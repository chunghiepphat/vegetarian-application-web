import React, {useContext} from "react";
import {searchDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {NavLink, useLocation} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";

const SearchTabs = ({data}) => {
    const location = useLocation();

    // Localizations
    searchDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="page-navbar">
            <Navbar>
                {data.listRecipe && data.listRecipe.length > 0 &&
                <NavLink to={{
                    pathname: "/search/recipes",
                    search: location.search,
                }}>{searchDisplayStrings.searchTabRecipes} ({data.listRecipe.length})</NavLink>}
                {data.listVideo && data.listVideo.length > 0 &&
                <NavLink to={{
                    pathname: "/search/videos",
                    search: location.search,
                }}>{searchDisplayStrings.searchTabVideos} ({data.listVideo.length})</NavLink>}
                {data.listBlog && data.listBlog.length > 0 &&
                <NavLink to={{
                    pathname: "/search/blogs",
                    search: location.search,
                }}>{searchDisplayStrings.searchTabBlogs} ({data.listBlog.length})</NavLink>}
            </Navbar>
        </section>
    )
}

export default SearchTabs;