import React, {useEffect, useRef, useState} from "react";
import LocalizedStrings from "react-localization";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const HomeLatestRecipes = ({user, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Our community's latest recipes",
            seeMore: "See more",
        },
        vi: {
            header: "Những công thức đang được chia sẻ",
            seeMore: "Xem thêm",
        }
    });
    // Handles slider scroll on button click
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    // Data states & API endpoint
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/recipes/get10recipes${user ? `?userID=${user.id}` : ``}`;
    // Fetches data on page load
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{strings.header}</h1>
                <Link to="/browse/recipes"><FaAngleRight/>{strings.seeMore}</Link>
            </header>
            <Panel>
                {!isLoading ? <>
                    {!isError ? <>
                        {data && data.length > 0 ? <>
                            {/*Scroll buttons*/}
                            <button className="panel-scroll scroll-left" onClick={() => scroll(-350)}>
                                <FaAngleLeft/>
                            </button>
                            <button className="panel-scroll scroll-right" onClick={() => scroll(350)}>
                                <FaAngleRight/>
                            </button>
                            {/*Scrollable card container*/}
                            <div className="panel-slider" ref={ref}>
                                {/*Iterates over the result JSON and renders a matching amount of card items*/}
                                {data.map(item => (
                                    <ArticleTile className="tile-small"
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
                            </div>
                        </> : <PanelEmp/>}
                    </> : <PanelErr reload={() => fetchData(api, setData, setIsLoading, setIsError)}/>}
                </> : <PanelLoader/>}
            </Panel>
        </section>
    )
}

export default HomeLatestRecipes;