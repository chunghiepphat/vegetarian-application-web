import React, {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import Tile from "../../commons/elements/containers/Tile";
import {UserContext} from "../../../context/UserContext";

const DashboardRecipes = () => {
    // Gets current user's info
    let user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);

    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiBase}/recipes/get10recipebyuser/${user.id}`;
        const response = await fetch(api, request);
        const result = await response.json();
        setData(result.listResult);
    }

    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

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
            {data ?
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
                                {data.map(item => (
                                    <Tile className="tile-small"
                                          id={item.recipe_id}
                                          type="recipe"
                                          title={item.recipe_title}
                                          thumbnail={item.recipe_thumbnail}
                                          userId={item.user_id}
                                          firstName={item.first_name}
                                          lastName={item.last_name}
                                          time={item.time}
                                          totalLikes={item.totalLike}/>
                                ))}
                            </div>
                        </>
                        :
                        <PanelLoader/>
                    }
                </Panel>
                :
                <div className="section-content">
                    <em>Seems empty here...</em>
                </div>
            }
        </section>
    )
}

export default DashboardRecipes;