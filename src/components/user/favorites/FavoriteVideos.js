import React, {useContext, useEffect} from "react";
import {favoritesDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import Panel from "../../commons/elements/containers/Panel";
import VideoCard from "../../commons/elements/containers/VideoCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const FavoriteVideos = ({location, data, isLoading, isError, fetchData}) => {
    // Localizations
    favoritesDisplayStrings.setLanguage(useContext(LocaleContext));

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{favoritesDisplayStrings.favoriteVideosHeader}</h1>
                <p>{favoritesDisplayStrings.favoriteVideosSubheader}</p>
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
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default FavoriteVideos;