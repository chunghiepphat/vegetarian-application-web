import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Card from "../../../commons/elements/containers/Card";
import {apiPattern} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";

const DashboardRecipes = () => {
    // Gets current user's info
    let user = JSON.parse(localStorage.getItem("userInfo"));

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
                <Link to={`/${user.id}/history/recipes`}><FaAngleRight/>View all</Link>
            </header>
            <Panel>
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
                    {data && data.map(recipe => (
                        <Card className="card-narrow"
                              id={recipe.recipe_id}
                              type="recipe"
                              title={recipe.recipe_title}
                              thumbnail={recipe.recipe_thumbnail}
                              first_name={recipe.first_name}
                              last_name={recipe.last_name}
                        />
                    ))}
                </div>
            </Panel>
        </section>
    )
}

export default DashboardRecipes;