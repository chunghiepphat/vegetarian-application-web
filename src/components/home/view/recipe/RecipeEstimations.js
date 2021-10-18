import React from "react";
import {FaClock, FaFire} from "react-icons/all";

const RecipeEstimations = ({data}) => {
    return (
        <section className="article-list">
            <ul>
                {data.recipe_difficulty &&
                <li><FaFire/> Difficulty: {data.recipe_difficulty}</li>}
                {data.prep_time_minutes > 0 &&
                <li><FaClock/> Prep time: {data.prep_time_minutes} minutes</li>}
                {data.baking_time_minutes > 0 &&
                <li><FaClock/> Baking time: {data.baking_time_minutes} minutes</li>}
                {data.resting_time_minutes > 0 &&
                <li><FaClock/> Resting time: {data.resting_time_minutes} minutes</li>}
            </ul>
        </section>
    )
}

export default RecipeEstimations;