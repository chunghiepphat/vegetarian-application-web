import React, {useEffect} from "react";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const DraftVideos = ({user, location, data, isLoading, isError, fetchData}) => {
    useEffect(() => {
        fetchData();
    }, [location, user]);

    return (
        <section>
            <div className="section-content">
                <h1>Videos</h1>
                <p>Your saved drafts & private videos.</p>
                <Panel filler="tile-video">
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
                                               isFavorite={item.is_like}/>))}
                            </> : <PanelEmp message="It seems you haven't saved any drafts yet."/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default DraftVideos;