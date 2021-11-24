import React from "react";
import LocalizedStrings from "react-localization";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";

const ConsoleResultVideos = ({data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            messageEmpty: "There were no videos matching your criteria.",
        },
        vi: {
            messageEmpty: "Không có video hướng dẫn nào khớp với tìm kiếm của bạn.",
        }
    });

    return (
        <section>
            <div className="section-content">
                <Panel filler="tile-video" style={{justifyContent: "space-evenly"}}>
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
                                       totalLikes={item.totalLike}
                                       status={item.status}/>))}
                    </> : <PanelEmp message={strings.messageEmpty}/>}
                </Panel>
            </div>
        </section>
    )
}

export default ConsoleResultVideos;