import React, {useEffect, useRef, useState} from "react";
import {apiBase} from "../../../helpers/Variables";
import bannerBackground from "assets/profile-banner-default.png";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import HomeShortcuts from "./HomeShortcuts";

const HomeBanner = ({user, location}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const api = `${apiBase}/recipes/get5bestrecipes${user ? `?userID=${user.id}` : ``}`;
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setIsLoading(false);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchData();
    }, [user]);
    // Handle banner scroll button
    const scrollRef = useRef(null);
    const executeScroll = () => scrollRef.current.scrollIntoView({behavior: 'smooth'});

    return (
        <div className="banner-container banner-home">
            {/*Best recipes showcase banner*/}
            <div className="banner">
                <section className="banner-section banner-showcase">
                    <header className="section-header">
                        <h1>Popular recipes</h1>
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
                <HomeShortcuts user={user} location={location} scrollRef={scrollRef}/>
            </div>
            {/*Blurred banner background*/}
            <div className="banner-background" style={{backgroundImage: `url(${bannerBackground})`}}>
                <div className="banner-overlay"/>
            </div>
        </div>
    )
}

export default HomeBanner