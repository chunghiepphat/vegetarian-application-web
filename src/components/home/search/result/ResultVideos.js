import React, {useContext} from "react";
import {searchDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import Panel from "../../../commons/elements/containers/Panel";
import VideoTile from "../../../commons/elements/containers/VideoTile";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";

const ResultVideos = ({data}) => {
    // Localizations
    searchDisplayStrings.setLanguage(useContext(LocaleContext));

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
                                       totalLikes={item.totalLike}/>))}
                    </> : <PanelEmp message={searchDisplayStrings.searchResultsVideosEmpty}/>}
                </Panel>
            </div>
        </section>
    )
}

export default ResultVideos;