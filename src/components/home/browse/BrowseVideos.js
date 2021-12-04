import React, {useContext, useEffect} from "react";
import {browseDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import VideoCard from "../../commons/elements/containers/VideoCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const BrowseVideos = ({user, data, isLoading, isError, fetchData}) => {
    // Localizations
    browseDisplayStrings.setLanguage(useContext(LocaleContext));

    // Executes fetch on page load
    const api = `${apiUrl}/video/getall?page=1&limit=100${user ? `&userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api);
    }, [user]);

    return (
        <section>
            <div className="section-content">
                <h1>{browseDisplayStrings.browseVideosHeader}</h1>
                <p>{browseDisplayStrings.browseVideosSubheader}.</p>
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
                                               thumbnail={item.video_thumbnail}
                                               firstName={item.first_name}
                                               lastName={item.last_name}
                                               time={item.time_created}
                                               isFavorite={item.is_like}
                                               totalLikes={item.totalLike}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={() => fetchData(api)}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default BrowseVideos;