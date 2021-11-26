import React, {useContext, useEffect} from "react";
import {draftDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import Panel from "../../commons/elements/containers/Panel";
import VideoTile from "../../commons/elements/containers/VideoTile";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const DraftVideos = ({location, data, isLoading, isError, fetchData}) => {
    // Localizations
    draftDisplayStrings.setLanguage(useContext(LocaleContext));

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{draftDisplayStrings.draftVideosHeader}</h1>
                <p>{draftDisplayStrings.draftVideosSubheader}</p>
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
                            </> : <PanelEmp message={draftDisplayStrings.draftVideosEmpty}/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default DraftVideos;