import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {UserContext} from "../../../context/UserContext";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";

const HomeLatestRecipes = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiBase}/recipes/get10recipes`;
        const response = await fetch(api);
        if (response.ok) {
            const result = await response.json();
            setData(result.listResult);
            setIsLoading(false);
        } else if (response.status >= 400 && response.status < 600) {
            setIsError(true);
            setIsLoading(false);
        }
    }
    // Handles slider scrolling on button click
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
            setIsError(true);
        });
    }, [location]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Our community's latest recipes</h1>
                <Link to="/browse/recipes"><FaAngleRight/>See more</Link>
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
                                                 time={item.time}
                                                 totalLikes={item.totalLike}/>))}
                            </div>
                        </> : <PanelEmp/>}
                    </> : <PanelErr reload={fetchData}/>}
                </> : <PanelLoader/>}
            </Panel>
        </section>
    )
}

export default HomeLatestRecipes;