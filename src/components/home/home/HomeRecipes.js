import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Card from "../../commons/elements/Card";

const HomeRecipes = () => {
    const api = "http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/get10recipes";
    const ref = useRef(null);
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData();
    }, []);

    // Handles slider scrolling on button click
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <section className="home-showcase">
            <header className="section-header linked-header">
                <h1>Our community's latest recipes</h1>
                <Link to="/browse/recipes"><FaAngleRight/>See more</Link>
            </header>
            <div className="card-deck">
                {/*Scroll buttons*/}
                <button className="deck-button scroll-left" onClick={() => scroll(-350)}>
                    <FaAngleLeft/>
                </button>
                <button className="deck-button scroll-right" onClick={() => scroll(350)}>
                    <FaAngleRight/>
                </button>
                {/*Scrollable card container*/}
                <div className="deck-slider" ref={ref}>
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data && data.map(recipe => (
                        <Card key={recipe.recipe_id}
                              id={recipe.recipe_id}
                              type="recipe"
                              title={recipe.recipe_title}
                              thumbnail={recipe.recipe_thumbnail}
                              first_name={recipe.first_name}
                              last_name={recipe.last_name}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeRecipes;