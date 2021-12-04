import React, {useContext, useEffect, useState} from "react";
import {homeDisplayStrings} from "../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {UserContext} from "../../context/UserContext";
import {apiUrl} from "../../helpers/Variables";
import {NavLink, useLocation, withRouter} from "react-router-dom";
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

    // Localizations
    homeDisplayStrings.setLanguage(useContext(LocaleContext));

    // Handles fetching recommended recipes if user is logged in
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [recommendations, setRecommendations] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
    const [isErrorRecipes, setIsErrorRecipes] = useState(false);
    const fetchRecommendations = async () => {
        // Checks authentication
        if (user !== null && token !== null) {
            setIsErrorRecipes(false);
            setIsLoadingRecipes(true);
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
                    await setRecommendations(result.listBody);
                    await setSuggestions(result.listSuggest);
                    setIsLoadingRecipes(false);
                } else if (response.status >= 400 && response.status < 600) {
                    setIsErrorRecipes(true);
                    setIsLoadingRecipes(false);
                }
            } catch (error) {
                setIsErrorRecipes(true);
                setIsLoadingRecipes(false);
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
            setIsErrorBlogs(true);
            setIsLoadingBlogs(false);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, [user]);

    return (
        <Sidebar>
            <section className="sidebar-widget">
                <h1>{homeDisplayStrings.homeSidebarExplore}</h1>
                <Navbar>
                    <NavLink to="/browse/recipes"><FaAngleRight/>{homeDisplayStrings.homeSidebarExploreRecipes}
                    </NavLink>
                    <NavLink to="/browse/videos"><FaAngleRight/>{homeDisplayStrings.homeSidebarExploreVideos}</NavLink>
                    <NavLink to="/browse/blogs"><FaAngleRight/>{homeDisplayStrings.homeSidebarExploreBlogs}</NavLink>
                </Navbar>
            </section>
            <section className="sidebar-widget">
                <h1>{homeDisplayStrings.homeSidebarSearch}</h1>
                <Navbar>
                    <NavLink to="/search"><FaAngleRight/>{homeDisplayStrings.homeSidebarSearchUrl}</NavLink>
                </Navbar>
            </section>
            {user &&
            <section className="sidebar-widget">
                <h1>{homeDisplayStrings.homeSidebarRecommendations}</h1>
                <Panel>
                    {!isLoadingRecipes ? <>
                        {!isErrorRecipes ? <>
                            {recommendations && recommendations.length ? <>
                                {recommendations.map(item => (
                                    <ArticleCard className="card--compact"
                                                 key={item.recipe_id}
                                                 id={item.recipe_id}
                                                 type="recipe"
                                                 title={item.recipe_title}
                                                 thumbnail={item.recipe_thumbnail}
                                                 userId={item.user_id}
                                                 firstName={item.first_name}
                                                 lastName={item.last_name}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchRecommendations}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </section>}
            {user &&
            <section className="sidebar-widget">
                <h1>{homeDisplayStrings.homeSidebarSuggestions}</h1>
                <Panel>
                    {!isLoadingRecipes ? <>
                        {!isErrorRecipes ? <>
                            {suggestions && suggestions.length ? <>
                                {suggestions.map(item => (
                                    <ArticleCard className="card--compact"
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
                <h1>{homeDisplayStrings.homeSidebarBlogs}</h1>
                <Panel>
                    {!isLoadingBlogs ? <>
                        {!isErrorBlogs ? <>
                            {blogs && blogs.length ? <>
                                {blogs.map(item => (
                                    <ArticleCard className="card--small"
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