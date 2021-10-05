import React, {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {apiPattern} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import Tile from "../../commons/elements/containers/Tile";
import {UserContext} from "../../../context/UserContext";

const DashboardRecipes = () => {
    // Gets current user's info
    let user = useContext(UserContext);

    // Fetches data on page load
    const api = `${apiPattern}/recipes/get10recipebyuser/${user.id}`;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    // Handles slider scrolling on button click
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your recent posts</h1>
                <Link to="/history/recipes"><FaAngleRight/>View all</Link>
            </header>
            <Panel>
                {data.length > 0 ?
                    <>{/*Scroll buttons*/}
                        <button className="panel-scroll scroll-left" onClick={() => scroll(-350)}>
                            <FaAngleLeft/>
                        </button>
                        <button className="panel-scroll scroll-right" onClick={() => scroll(350)}>
                            <FaAngleRight/>
                        </button>
                        {/*Scrollable card container*/}
                        <div className="panel-slider" ref={ref}>
                            {/*Iterates over the result JSON and renders a matching amount of card items*/}
                            {data.map(recipe => (
                                <Tile className="tile-small"
                                      id={recipe.recipe_id}
                                      type="recipe"
                                      title={recipe.recipe_title}
                                      thumbnail={recipe.recipe_thumbnail}
                                      firstName={recipe.first_name}
                                      lastName={recipe.last_name}/>
                            ))}
                        </div>
                    </>
                    :
                    <PanelLoader/>
                }
            </Panel>
        </section>
    )
}

export default DashboardRecipes;