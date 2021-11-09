import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";

const HomeLatestVideos = ({user, location}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const api = `${apiBase}/video/get4videos${user ? `?userID=${user.id}` : ``}`;
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
    }, [location, user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Latest how-to videos</h1>
                <Link to="/browse/videos"><FaAngleRight/>See more</Link>
            </header>
            <div className="section-content">
                <Panel filler="card-wide">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map((item, index) => (
                                    <VideoTile key={item.id}
                                               id={item.id}
                                               type="blog"
                                               title={item.video_title}
                                               link={item.video_link}
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

export default HomeLatestVideos;