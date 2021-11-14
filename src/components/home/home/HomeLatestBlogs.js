import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiBase} from "../../../helpers/Variables";
import {FaAngleRight} from "react-icons/fa";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const HomeLatestBlogs = ({user, location}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const api = `${apiBase}/blogs/get10blogs${user ? `?userID=${user.id}` : ``}`;
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setIsLoading(false);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchData();
    }, [user, location]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Newest stories around</h1>
                <Link to="/browse/blogs"><FaAngleRight/>See more</Link>
            </header>
            <div className="section-content">
                <Panel filler="card-wide">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map((item, index) => (
                                    <ArticleCard className={`${index < 4 ? "card-wide" : "card-medium"}`}
                                                 key={item.blog_id}
                                                 id={item.blog_id}
                                                 type="blog"
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
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default HomeLatestBlogs;