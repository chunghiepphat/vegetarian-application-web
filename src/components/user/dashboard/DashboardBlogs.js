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
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);

    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiBase}/blogs/get10blogbyuser/${user.id}`;
        const response = await fetch(api, request);
        const result = await response.json();
        setData(result.listResult);
    }

    useEffect(fetchData, []);

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
                            data.map(item => (
                                <Card className="card-full"
                                      id={item.blog_id}
                                      type="blog"
                                      title={item.blog_title}
                                      thumbnail={item.blog_thumbnail}
                                      subtitle={item.blog_subtitle}
                                      userId={item.user_id}
                                      firstName={item.first_name}
                                      lastName={item.last_name}
                                      time={item.time}
                                      totalLikes={item.totalLike}/>
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