import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Card from "../../commons/elements/containers/Card";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";

const DashboardBlogs = () => {
    // Gets current user's info
    const user = useContext(UserContext);

    // Fetches data on page load
    const api = `${apiBase}/blogs/get10blogbyuser/${user.id}`;
    const [data, setData] = useState([]);
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
        <section>
            <header className="section-header linked-header">
                <h1>Your recent blogs</h1>
                <Link to="/history/blogs"><FaAngleRight/>View all</Link>
            </header>
            <div className="section-content">
                {data ?
                    <Panel>
                        {data.length > 0 ?
                            data.map(blog => (
                                <Card className="card-full"
                                      id={blog.blog_id}
                                      type="blog"
                                      title={blog.blog_title}
                                      thumbnail={blog.blog_thumbnail}
                                      subtitle={blog.blog_subtitle}
                                      firstName={blog.first_name}
                                      lastName={blog.last_name}
                                      time={blog.time}
                                      totalLike={blog.totalLike}/>
                            ))
                            :
                            <PanelLoader/>
                        }
                    </Panel>
                    :
                    <em>Seems empty here...</em>
                }
            </div>
        </section>
    )
}

export default DashboardBlogs;