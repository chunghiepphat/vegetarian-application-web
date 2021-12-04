import React, {useEffect} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import VideoCard from "../../../commons/elements/containers/VideoCard";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";

const UserVideos = ({user, location, data, isLoading, isError, fetchData, userId}) => {
    const api = `${apiUrl}/video/getallbyuserIDdifferent/${userId}?page=1&limit=100${user ? `&userID=${user.id}` : ``}`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api)
    }, [location, user]);

    return (
        <section>
            <div className="section-content">
                <h1>Videos</h1>
                <p>Videos created by this user are shown here.</p>
                <Panel filler="tile-video">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <VideoCard key={item.id}
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
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default UserVideos;