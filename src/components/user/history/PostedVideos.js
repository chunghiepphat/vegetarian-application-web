import React, {useEffect} from "react";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import LocalizedStrings from "react-localization";

const PostedVideos = ({user, location, data, isLoading, isError, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            videoHeader: "Videos",
            videoMessageHeader: "Your published videos tutorials.",
            videoMessageEmpty: "It seems you haven't posted anything yet.",
        },
        vi: {
            videoHeader: "Video",
            videoMessageHeader: "Video mà bạn đã đăng",
            videoMessageEmpty: "Có vẻ như bạn chưa đăng video nào",
        }
    });

    const api = `${apiUrl}/video/getallbyuserID/${user.id}?page=1&limit=100`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api);
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{strings.videoHeader}</h1>
                <p>{strings.videoMessageHeader}</p>
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
                                               isFavorite={item.is_like}
                                               totalLikes={item.totalLike}/>))}
                            </> : <PanelEmp message={strings.videoMessageEmpty}/>}
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default PostedVideos;