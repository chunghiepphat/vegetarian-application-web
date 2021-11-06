import React, {useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader, SectionLoader} from "../../commons/elements/loaders/Loader";
import Panel from "../../commons/elements/containers/Panel";
import {useLocation} from "react-router-dom";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import VideoTile from "../../commons/elements/containers/VideoTile";

const BrowseVideos = ({data, isLoading, isError, fetchData}) => {
    const location = useLocation();
    const api = `${apiBase}/video/getall?page=1&limit=100`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api)
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>Videos</h1>
                <i>Follow along and try for yourself with these how-to videos.</i>
                <Panel filler="card-medium">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <VideoTile key={item.id}
                                               id={item.id}
                                               type="blog"
                                               title={item.video_title}
                                               link={item.video_link}
                                               userId={item.user_id}
                                               firstName={item.first_name}
                                               lastName={item.last_name}
                                               time={item.time_created}
                                               totalLikes={item.totalLike}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default BrowseVideos;