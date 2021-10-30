import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";
import Navbar from "../commons/elements/bars/Navbar";
import Card from "../commons/elements/containers/Card";
import {apiBase} from "../../helpers/Helpers";
import Panel from "../commons/elements/containers/Panel";
import {PanelLoader} from "../commons/elements/loaders/Loader";
import {UserContext} from "../../context/UserContext";

const HomeSidebar = () => {
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
    }, []);
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
            <section className="sidebar-widget">
                <h1>Try these</h1>
                <Navbar>
                    <Link to="/tags/main-courses"><FaAngleRight/>Main courses</Link>
                    <Link to="/tags/soups"><FaAngleRight/>Soups</Link>
                    <Link to="/tags/snacks"><FaAngleRight/>Snacks</Link>
                    <Link to="/tags/desserts"><FaAngleRight/>Desserts</Link>
                </Navbar>
            </section>
            {recommendations &&
            <section className="sidebar-widget">
                <h1>Recommended for you</h1>
                <Panel>
                    {recommendations.length ?
                        recommendations.map(recipe => (
                            <Card className="card-medium"
                                  key={recipe.recipe_id}
                                  id={recipe.recipe_id}
                                  type="recipe"
                                  title={recipe.recipe_title}
                                  thumbnail={recipe.recipe_thumbnail}
                                  firstName={recipe.first_name}
                                  lastName={recipe.last_name}
                                  totalLikes={recipe.totalLike}/>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>
            </section>}
            <section className="sidebar-widget">
                <h1>Popular stories</h1>
                {blogs &&
                <Panel>
                    {blogs.length ?
                        blogs.map(blog => (
                            <Card className="card-medium"
                                  key={blog.blog_id}
                                  id={blog.blog_id}
                                  type="blog"
                                  hideThumbnail={true}
                                  title={blog.blog_title}
                                  subtitle={blog.blog_subtitle}
                                  thumbnail={blog.blog_thumbnail}
                                  firstName={blog.first_name}
                                  lastName={blog.last_name}
                                  totalLikes={blog.totalLike}/>
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