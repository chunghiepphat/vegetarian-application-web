import React, {useContext, useEffect, useState} from "react";
import {NavLink, useLocation, withRouter} from "react-router-dom";
import {apiBase} from "../../helpers/Helpers";
import {UserContext} from "../../context/UserContext";
import Sidebar from "../commons/elements/Sidebar";
import Navbar from "../commons/elements/bars/Navbar";
import Panel from "../commons/elements/containers/Panel";
import ArticleCard from "../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../commons/elements/loaders/Loader";
import {PanelEmp} from "../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../commons/elements/loaders/AlertError";

import {FaAngleRight} from "react-icons/fa";

const HomeSidebar = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [blogs, setBlogs] = useState([]);
    const [isBlogsLoading, setIsBlogsLoading] = useState(false);
    const [isBlogsError, setIsBlogsError] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [isRecLoading, setIsRecLoading] = useState(false);
    const [isRecError, setIsRecError] = useState(false);
    const fetchRecommendations = async () => {
        if (user !== null && token !== null) {
            setIsRecLoading(true);
            // Generates request headers
            let headers = new Headers();
            if (token) headers.append("Authorization", `Bearer ${token.token}`);
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            // Generates request
            let request = {
                method: 'GET',
                headers: headers,
            };
            try {
                const api = `${apiBase}/recipes/suggestion/${user.id}`;
                const response = await fetch(api, request);
                if (response.ok) {
                    const result = await response.json();
                    setRecommendations(result);
                    setIsRecLoading(false);
                } else if (response.status >= 400 && response.status < 600) {
                    setIsRecError(true);
                    setIsRecLoading(false);
                }
            } catch (error) {
                console.error(error);
                setIsRecError(true);
            }
        }
    }
    const fetchBlogs = async () => {
        setIsBlogsLoading(true);
        const api = `${apiBase}/blogs/get5bestblog${user ? `?userID=${user.id}` : ``}`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setBlogs(result.listResult);
                setIsBlogsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsBlogsError(true);
                setIsBlogsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsBlogsError(true);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchBlogs();
        fetchRecommendations();
    }, [location, user]);

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>Explore</h1>
                <Navbar>
                    <NavLink to="/browse/recipes"><FaAngleRight/>Recipes</NavLink>
                    <NavLink to="/browse/videos"><FaAngleRight/>Videos</NavLink>
                    <NavLink to="/browse/blogs"><FaAngleRight/>Blogs</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>Search</h1>
                <Navbar>
                    <NavLink to="/search"><FaAngleRight/>Advanced search</NavLink>
                </Navbar>
            </section>
            {user &&
            <section className="sidebar-widget">
                <h1>Try these recipes</h1>
                <Panel>
                    {!isRecLoading ? <>
                        {!isRecError ? <>
                            {recommendations && recommendations.length ? <>
                                {recommendations.map(item => (
                                    <ArticleCard className="card-compact"
                                                 key={item.recipe_id}
                                                 id={item.recipe_id}
                                                 type="recipe"
                                                 title={item.recipe_title}
                                                 thumbnail={item.recipe_thumbnail}
                                                 userId={item.user_id}
                                                 firstName={item.first_name}
                                                 lastName={item.last_name}
                                                 recommendationCriteria={item.criteria}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchRecommendations}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </section>}
            <section className="sidebar-widget">
                <h1>Popular stories</h1>
                <Panel>
                    {!isBlogsLoading ? <>
                        {!isBlogsError ? <>
                            {blogs && blogs.length ? <>
                                {blogs.map(item => (
                                    <ArticleCard className="card-small"
                                                 key={item.blog_id}
                                                 id={item.blog_id}
                                                 type="blog"
                                                 hideThumbnail={false}
                                                 title={item.blog_title}
                                                 subtitle={item.blog_subtitle}
                                                 thumbnail={item.blog_thumbnail}
                                                 userId={item.user_id}
                                                 firstName={item.first_name}
                                                 lastName={item.last_name}
                                                 time={item.time_created}
                                                 isFavorite={item.is_like}
                                                 totalLikes={item.totalLike}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchBlogs}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </section>
        </Sidebar>
    )
}

export default withRouter(HomeSidebar);