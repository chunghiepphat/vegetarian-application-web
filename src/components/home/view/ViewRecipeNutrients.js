import React from "react";
import {FaClock, FaFire} from "react-icons/all";

const ViewRecipeNutrients = (props) => {
    console.log(props.nutrients.protein)
    return (
        <section className="article-info">
            <p>
                <em>(*) These values are only (very) rough estimates based on the ingredients of this recipes.</em>
            </p>
            <p>
                <em>(**) Be noted that these values might be (extremely) inaccurate if one or more ingredients were not
                    defined in our databases.</em>
            </p>
            <ul>
                {props.nutrients.protein > 0 &&
                <li><FaFire/> Protein (mg): {props.nutrients.protein}</li>}
                {props.nutrients.fat > 0 &&
                <li><FaClock/> Fat (mg): {props.nutrients.fat}</li>}
                {props.carb > 0 &&
                <li><FaClock/> Carbohydrates (mg): {props.nutrients.carb}</li>}
                {props.nutrients.calories > 0 &&
                <li><FaClock/> Calories (kcal): {props.nutrients.calories}</li>}
            </ul>
        </section>
    )
}

export default ViewRecipeNutrients;