import React, {useContext, useEffect, useRef, useState} from "react";
import {homeDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link} from "react-router-dom";
import Panel from "../../commons/elements/containers/Panel";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const HomeLatestRecipes = ({user, fetchData}) => {
    // Localizations
    homeDisplayStrings.setLanguage(useContext(LocaleContext));

    // Data states, API endpoint & fetches data on page load
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/recipes/get10recipes${user ? `?userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    // Handles slider scroll on button click
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{homeDisplayStrings.homeRecipesHeader}</h1>
                <Link to="/browse/recipes"><FaAngleRight/>{homeDisplayStrings.homeRecipesSeeMore}</Link>
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
                                    <ArticleTile className="tile-a--small"
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