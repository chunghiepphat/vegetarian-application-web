import React, {useContext, useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {NavLink, withRouter} from "react-router-dom";
import {apiUrl} from "../../helpers/Variables";
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
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            headerExplore: "Explore",
            urlRecipes: "Recipes",
            urlVideos: "Videos",
            urlBlogs: "Blogs",
            headerSearch: "Search",
            urlSearch: "Advanced search",
            headerRecommendations: "Try these recipes",
            headerBlogs: "Popular stories",

        },
        vi: {
            headerExplore: "Khám phá",
            urlRecipes: "Công thức nấu ăn",
            urlVideos: "Video hướng dẫn",
            urlBlogs: "Bài viết chia sẻ",
            headerSearch: "Tìm kiếm",
            urlSearch: "Tìm kiếm nâng cao",
            headerRecommendations: "Có lẽ bạn sẽ thích",
            headerBlogs: "Bài viết phổ biến",
        }
    });
    // Handles fetching recommended recipes if user is logged in
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [recommendations, setRecommendations] = useState([]);
    const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
    const [isErrorRecommendations, setIsErrorRecommendations] = useState(false);
    const fetchRecommendations = async () => {
        // Checks authentication
        if (user !== null && token !== null) {
            setIsErrorRecommendations(false);
            setIsLoadingRecommendations(true);
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
            // Executes fetch
            const api = `${apiUrl}/recipes/suggestion/${user.id}`;
            try {
                const response = await fetch(api, request);
                if (response.ok) {
                    const result = await response.json();
                    setRecommendations(result);
                    setIsLoadingRecommendations(false);
                } else if (response.status >= 400 && response.status < 600) {
                    setIsErrorRecommendations(true);
                    setIsLoadingRecommendations(false);
                }
            } catch (error) {
                setIsErrorRecommendations(true);
            }
        }
    }
    useEffect(() => {
        if (user !== null && token !== null) fetchRecommendations();
    }, [user]);
    // Handles fetching popular blogs
    const [blogs, setBlogs] = useState([]);
    const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
    const [isErrorBlogs, setIsErrorBlogs] = useState(false);
    const fetchBlogs = async () => {
        setIsErrorBlogs(false);
        setIsLoadingBlogs(true);
        const api = `${apiUrl}/blogs/get5bestblog${user ? `?userID=${user.id}` : ``}`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setBlogs(result.listResult);
                setIsLoadingBlogs(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsErrorBlogs(true);
                setIsLoadingBlogs(false);
            }
        } catch (error) {
            console.error(error);
            setIsErrorBlogs(true);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, [user]);

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{strings.headerExplore}</h1>
                <Navbar>
                    <NavLink to="/browse/recipes"><FaAngleRight/>{strings.urlRecipes}</NavLink>
                    <NavLink to="/browse/videos"><FaAngleRight/>{strings.urlVideos}</NavLink>
                    <NavLink to="/browse/blogs"><FaAngleRight/>{strings.urlBlogs}</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{strings.headerSearch}</h1>
                <Navbar>
                    <NavLink to="/search"><FaAngleRight/>{strings.urlSearch}</NavLink>
                </Navbar>
            </section>
            {user &&
            <section className="sidebar-widget">
                <h1>{strings.headerRecommendations}</h1>
                <Panel>
                    {!isLoadingRecommendations ? <>
                        {!isErrorRecommendations ? <>
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
                <h1>{strings.headerBlogs}</h1>
                <Panel>
                    {!isLoadingBlogs ? <>
                        {!isErrorBlogs ? <>
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