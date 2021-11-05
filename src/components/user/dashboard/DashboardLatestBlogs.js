import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const DashboardLatestBlogs = () => {
    // Gets current user's info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
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
        if (response.ok) {
            const result = await response.json();
            setData(result.listResult);
            setIsLoading(false);
        } else if (response.status >= 400 && response.status < 600) {
            setIsError(true);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
            setIsError(true);
        });
    }, [user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your recent blogs</h1>
                <Link to="/history/blogs"><FaAngleRight/>View all</Link>
            </header>
            <div className="section-content">
                {data &&
                <Panel filler="card-medium">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data.length > 0 ? <>
                                {data.map(item => (
                                    <ArticleCard className="card-medium"
                                                 id={item.blog_id}
                                                 type="blog"
                                                 title={item.blog_title}
                                                 thumbnail={item.blog_thumbnail}
                                                 subtitle={item.blog_subtitle}
                                                 userId={item.user_id}
                                                 firstName={item.first_name}
                                                 lastName={item.last_name}
                                                 time={item.time}
                                                 totalLikes={item.totalLike}
                                                 status={item.status}/>))}
                            </> : <PanelEmp message="It seems you haven't posted anything yet."/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>}
            </div>
        </section>
    )
}

export default DashboardLatestBlogs;