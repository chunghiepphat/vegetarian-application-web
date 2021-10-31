import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, useLocation, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";
import Navbar from "../commons/elements/bars/Navbar";
import Card from "../commons/elements/containers/Card";
import {apiBase} from "../../helpers/Helpers";
import Panel from "../commons/elements/containers/Panel";
import {PanelLoader} from "../commons/elements/loaders/Loader";
import {UserContext} from "../../context/UserContext";

const HomeSidebar = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [blogs, setBlogs] = useState([]);
    const [recommendations, setRecommendations] = useState([]);


    const fetchRecommendations = async () => {
        if (user !== null && token !== null) {
            // Generates request headers
            let headers = new Headers();
            headers.append("Authorization", `Bearer ${token.token}`);
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");

            // Generates request
            let request = {
                method: 'GET',
                headers: headers,
            };

            const api = `${apiBase}/recipes/suggestion/${user.id}`;
            const response = await fetch(api, request);
            const result = await response.json();
            setRecommendations(result);
        }
    }

    const fetchBlogs = async () => {
        const api = `${apiBase}/blogs/get5bestblog`;
        const response = await fetch(api);
        const result = await response.json();
        setBlogs(result.listResult);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchBlogs().catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        fetchRecommendations().catch(error => {
            console.error(error);
        });
    }, [user]);
    console.log(recommendations)

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
                {recommendations &&
                <Panel>
                    {recommendations.length ?
                        recommendations.map(item => (
                            <Card className="card-medium"
                                  key={item.recipe_id}
                                  id={item.recipe_id}
                                  type="recipe"
                                  title={item.recipe_title}
                                  thumbnail={item.recipe_thumbnail}
                                  userId={item.user_id}
                                  firstName={item.first_name}
                                  lastName={item.last_name}
                                  recommendationCriteria={item.criteria}/>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>}
            </section>}
            <section className="sidebar-widget">
                <h1>Popular stories</h1>
                {blogs &&
                <Panel>
                    {blogs.length ?
                        blogs.map(item => (
                            <Card className="card-medium"
                                  key={item.blog_id}
                                  id={item.blog_id}
                                  type="blog"
                                  hideThumbnail={true}
                                  title={item.blog_title}
                                  subtitle={item.blog_subtitle}
                                  thumbnail={item.blog_thumbnail}
                                  userId={item.user_id}
                                  firstName={item.first_name}
                                  lastName={item.last_name}
                                  totalLikes={item.totalLike}/>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>}
            </section>
        </Sidebar>
    )
}

export default withRouter(HomeSidebar);