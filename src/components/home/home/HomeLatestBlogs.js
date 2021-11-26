import React, {useContext, useEffect, useState} from "react";
import {homeDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link} from "react-router-dom";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";

const HomeLatestBlogs = ({user, fetchData}) => {
    // Localizations
    homeDisplayStrings.setLanguage(useContext(LocaleContext));

    // Data states, API endpoint & fetches data on page load
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/blogs/get10blogs${user ? `?userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{homeDisplayStrings.homeBlogsHeader}</h1>
                <Link to="/browse/blogs"><FaAngleRight/>{homeDisplayStrings.homeBlogsSeeMore}</Link>
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
                        </> : <PanelErr reload={() => fetchData(api, setData, setIsLoading, setIsError)}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default HomeLatestBlogs;