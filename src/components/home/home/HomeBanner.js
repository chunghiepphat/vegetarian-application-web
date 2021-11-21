import React, {useEffect, useRef, useState} from "react";
import LocalizedStrings from "react-localization";
import {apiUrl} from "../../../helpers/Variables";
import bannerBackground from "assets/profile-banner-default.png";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import HomeBannerShortcuts from "./HomeBannerShortcuts";

const HomeBanner = ({user, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Popular recipes",
        },
        vi: {
            header: "Các công thức nấu ăn phổ biến",
        }
    });
    // Handles scroll button
    const scrollRef = useRef(null);
    const executeScroll = () => scrollRef.current.scrollIntoView({behavior: 'smooth'});
    // Data states & API endpoint
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/recipes/get5bestrecipes${user ? `?userID=${user.id}` : ``}`;
    // Fetches data on page load
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <div className="banner-container banner-home">
            {/*Best recipes showcase banner*/}
            <div className="banner">
                <section className="banner-section banner-showcase">
                    <header className="section-header">
                        <h1>{strings.header}</h1>
                    </header>
                    <div className="section-content">
                        <div className="banner-panel">
                            {!isLoading ? <>
                                {!isError ? <>
                                    {data && data.length > 0 ? <>
                                        {data.map((item, index) => (
                                            <ArticleTile
                                                className={`${index === 0 ? "tile-half" : "tile-eighth tile-eighth-" + index}`}
                                                key={item.recipe_id}
                                                id={item.recipe_id}
                                                type="recipe"
                                                title={item.recipe_title}
                                                thumbnail={item.recipe_thumbnail}
                                                userId={item.user_id}
                                                firstName={item.first_name}
                                                lastName={item.last_name}
                                                time={item.time_created}
                                                isFavorite={item.is_like}
                                                totalLikes={item.totalLike}/>))}
                                    </> : <PanelEmp style={{gridArea: "1 / 1 / 3 / 5"}}/>}
                                </> : <PanelErr style={{gridArea: "1 / 1 / 3 / 5"}} reload={fetchData}/>}
                            </> : <PanelLoader style={{gridArea: "1 / 1 / 3 / 5"}}/>}
                        </div>
                    </div>
                    <div className="banner-background" style={{backgroundImage: `url(${bannerBackground})`}}>
                        <div className="banner-overlay"/>
                    </div>
                </section>
                {/*Arrow button for snap scrolling down*/}
                <button onClick={executeScroll} className="button-scroll"><span/></button>
                {/*Quick shortcuts section*/}
                <HomeBannerShortcuts user={user} scrollRef={scrollRef}/>
            </div>
            {/*Blurred banner background*/}
            <div className="banner-background" style={{backgroundImage: `url(${bannerBackground})`}}>
                <div className="banner-overlay"/>
            </div>
        </div>
    )
}

export default HomeBanner