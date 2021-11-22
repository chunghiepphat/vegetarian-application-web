import React, {useEffect, useState} from "react";
import "./Home.css";
import {NavLink, useLocation} from "react-router-dom";
import SearchSidebar from "./SearchSidebar";
import Navbar from "../commons/elements/bars/Navbar";
import {apiUrl} from "../../helpers/Variables";
import {PanelLoader} from "../commons/elements/loaders/Loader";
import {PanelEmp} from "../commons/elements/loaders/AlertEmpty";
import SearchResult from "./search/SearchResult";
import LocalizedStrings from "react-localization";

const Search = () => {
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
    // Handles fetching results
    const query = location.search;
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiUrl}/home/find${query}`;
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                await setData(result);
                setIsLoading(false);
            } else setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData();    // fetches results again everytime the query changes
    }, [query])

    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <section className="page-toolbar">
                        <Navbar>
                            <div>Type of dish</div>
                            <div>Preparation time</div>
                            <div>Ingredients</div>
                            <div>Cuisine</div>
                            <div>Sort by:</div>
                        </Navbar>
                    </section>
                    {!isLoading ? <>
                        {data ? <>
                            <section className="page-navbar">
                                <Navbar>
                                    {data.listRecipe.length > 0 &&
                                    <NavLink to={{
                                        pathname: "/search/recipes",
                                        search: location.search,
                                    }}>{strings.urlRecipes} ({data.listRecipe.length})</NavLink>}
                                    {data.listVideo.length > 0 &&
                                    <NavLink to={{
                                        pathname: "/search/videos",
                                        search: location.search,
                                    }}>{strings.urlVideos} ({data.listVideo.length})</NavLink>}
                                    {data.listBlog.length > 0 &&
                                    <NavLink to={{
                                        pathname: "/search/blogs",
                                        search: location.search,
                                    }}>{strings.urlBlogs} ({data.listBlog.length})</NavLink>}
                                </Navbar>
                            </section>
                            <SearchResult data={data}/>
                        </> : <PanelEmp/>}
                    </> : <PanelLoader/>}
                </main>
                {/*Right sidebar*/}
                <SearchSidebar/>
            </div>
        </div>

    )
}

export default Search;