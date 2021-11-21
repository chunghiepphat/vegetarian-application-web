import React, {useEffect, useState} from "react";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";
import Panel from "../../../commons/elements/containers/Panel";
import {apiUrl} from "../../../../helpers/Variables";
import VideoTile from "../../../commons/elements/containers/VideoTile";

const ListVideos = ({user, location, isLoading, isError, fetchData}) => {
    const api = `${apiUrl}/video/admin/getall?page=1&limit=300`;
    const [data, setData] = useState([]);
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api, data, setData);
    }, [user, location]);

    return (
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
                                       thumbnail={item.video_thumbnail}
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
    )

}

export default ListVideos;