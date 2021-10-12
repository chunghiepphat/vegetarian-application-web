import React, {useEffect, useState} from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Sidebar from "../commons/elements/Sidebar";
import Navbar from "../commons/elements/bars/Navbar";
import Card from "../commons/elements/containers/Card";
import {apiBase} from "../../helpers/Helpers";
import Panel from "../commons/elements/containers/Panel";
import {PanelLoader} from "../commons/elements/loaders/Loader";

const HomeSidebar = () => {
    const api = `${apiBase}/blogs/get5bestblog`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

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
            <section className="sidebar-widget">
                <h1>Popular stories</h1>
                <Panel>
                    {data.length ?
                        data.map(blog => (
                            <Card className="card-medium"
                                  key={blog.blog_id}
                                  id={blog.blog_id}
                                  type="blog"
                                  title={blog.blog_title}
                                  thumbnail={blog.blog_thumbnail}
                                  first_name={blog.first_name}
                                  last_name={blog.last_name}
                                  time={blog.time}
                                  totalLike={blog.totalLike}/>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>
            </section>
        </Sidebar>
    )
}

export default withRouter(HomeSidebar);