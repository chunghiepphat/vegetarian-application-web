import React, {useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";

const HomeLatestBlogs = ({user, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Newest stories around",
            seeMore: "See more",
        },
        vi: {
            header: "Những bài viết mới nhất",
            seeMore: "Xem thêm",
        }
    });
    // Data states & API endpoint
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/blogs/get10blogs${user ? `?userID=${user.id}` : ``}`;
    // Fetches data on page load
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{strings.header}</h1>
                <Link to="/browse/blogs"><FaAngleRight/>{strings.seeMore}</Link>
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