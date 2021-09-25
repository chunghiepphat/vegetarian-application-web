import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Card from "../../../commons/elements/Card";

const ProfileDetailsRecipes = () => {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/get10recipebyuser/${user.id}`;
    const ref = useRef(null);
    const [recipes, setRecipes] = useState([]);

    // Fetches latest recipes by current user ID
    const getUserRecipes = async () => {
        const response = await fetch(api)
        const result = await response.json();
        return result;
    }

    // Executes fetch once on page load
    useEffect(async () => {
        const recipes = await getUserRecipes();
        setRecipes(recipes.listResult);
    }, []);

    // Handles slider scrolling on button click
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your recent posts</h1>
                <Link to={`/${user.id}/history/recipes`}><FaAngleRight/>View all</Link>
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
                    {recipes && recipes.map(recipe => (
                        <Card id={recipe.recipe_id}
                              type="recipe"
                              title={recipe.recipe_title}
                              thumbnail={recipe.recipe_thumbnail}
                              first_name={recipe.first_name}
                              last_name={recipe.last_name}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProfileDetailsRecipes;