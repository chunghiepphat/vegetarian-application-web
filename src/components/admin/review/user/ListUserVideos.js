import React, {useEffect} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import VideoCard from "../../../commons/elements/containers/VideoCard";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";

const ListUserVideos = ({user, location, data, isLoading, isError, fetchData, userId}) => {
    const api = `${apiUrl}/video/admin/getallbyuser/${userId}?page=1&limit=100`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api)
    }, [location, user, userId]);

    return (
        <section>
            <div className="section-content">
                <Panel filler="card--video">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <VideoCard key={item.id}
                                               id={item.id}
                                               title={item.video_title}
                                               link={item.video_link}
                                               userId={item.user_id}
                                               firstName={item.first_name}
                                               lastName={item.last_name}
                                               time={item.time_created}
                                               isFavorite={item.is_like}
                                               totalLikes={item.totalLike}
                                               status={item.status}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default ListUserVideos;