import React, {useEffect} from "react";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import LocalizedStrings from "react-localization";

const DraftVideos = ({location, data, isLoading, isError, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            videoDraftHeader: "Videos",
            videoDraftMessage: "Your saved drafts & private videos.",
            videoNoDraft: "It seems you haven't saved any drafts yet.",
        },
        vi: {
            videoDraftHeader: "Video",
            videoDraftMessage: "Nháp và video ẩn của tôi.",
            videoNoDraft: "Bạn chưa có video nháp nào.",
        }
    });

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{strings.videoDraftHeader}</h1>
                <p>{strings.videoDraftMessage}</p>
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
                            </> : <PanelEmp message={strings.videoNoDraft}/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default DraftVideos;