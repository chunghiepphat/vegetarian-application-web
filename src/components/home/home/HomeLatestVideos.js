import React, {useContext, useEffect, useState} from "react";
import {homeDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link} from "react-router-dom";
import Panel from "../../commons/elements/containers/Panel";
import VideoCard from "../../commons/elements/containers/VideoCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";

const HomeLatestVideos = ({user, fetchData}) => {
    // Localizations
    homeDisplayStrings.setLanguage(useContext(LocaleContext));

    // Data states, API endpoint & fetches data on page load
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/video/get4videos${user ? `?userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{homeDisplayStrings.homeVideosHeader}</h1>
                <Link to="/browse/videos"><FaAngleRight/>{homeDisplayStrings.homeVideosSeeMore}</Link>
            </header>
            <div className="section-content">
                <Panel>
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <VideoCard key={item.id}
                                               id={item.id}
                                               title={item.video_title}
                                               link={item.video_link}
                                               userId={item.user_id}
                                               thumbnail={item.video_thumbnail}
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

export default HomeLatestVideos;