import React from "react";
import LocalizedStrings from "react-localization";
import {NavLink, useLocation} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";

const ResultTabs = ({data}) => {
    const location = useLocation();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            urlRecipes: "Recipes",
            urlVideos: "Videos",
            urlBlogs: "Blogs",
        },
        vi: {
            urlRecipes: "Công thức",
            urlVideos: "Video hướng dẫn",
            urlBlogs: "Bài viết",
        }
    });

    return (
        <section className="page-navbar">
            <Navbar>
                {data.listRecipe && data.listRecipe.length > 0 &&
                <NavLink to={{
                    pathname: "/search/recipes",
                    search: location.search,
                }}>{strings.urlRecipes} ({data.listRecipe.length})</NavLink>}
                {data.listVideo && data.listVideo.length > 0 &&
                <NavLink to={{
                    pathname: "/search/videos",
                    search: location.search,
                }}>{strings.urlVideos} ({data.listVideo.length})</NavLink>}
                {data.listBlog && data.listBlog.length > 0 &&
                <NavLink to={{
                    pathname: "/search/blogs",
                    search: location.search,
                }}>{strings.urlBlogs} ({data.listBlog.length})</NavLink>}
            </Navbar>
        </section>
    )
}

export default ResultTabs;