import React, {useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";

const HomeLatestVideos = ({user, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Latest how-to videos",
            seeMore: "See more",
        },
        vi: {
            header: "Các video hướng dẫn mới nhất",
            seeMore: "Xem thêm",
        }
    });
    // Data states & API endpoint
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/video/get4videos${user ? `?userID=${user.id}` : ``}`;
    // Fetches data on page load
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{strings.header}</h1>
                <Link to="/browse/videos"><FaAngleRight/>{strings.seeMore}</Link>
            </header>
            <div className="section-content">
                <Panel filler="tile-video">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <VideoTile key={item.id}
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