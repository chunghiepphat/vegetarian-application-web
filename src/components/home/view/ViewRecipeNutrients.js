import React from "react";
import {AiFillThunderbolt, IoMdNutrition} from "react-icons/all";

const ViewRecipeNutrients = (props) => {
    return (

        <section className="article-info">
            <h2>Estimated nutritional values per serving</h2>
            <ul>
                {props.nutrients.protein > 0 &&
                <li><
                    IoMdNutrition/> Protein (mg): {Math.round(props.nutrients.protein / props.portion)}
                </li>}
                {props.nutrients.fat > 0 &&
                <li>
                    <IoMdNutrition/> Fat (mg): {Math.round(props.nutrients.fat / props.portion)}
                </li>}
                {props.carb > 0 &&
                <li>
                    <IoMdNutrition/> Carbohydrates (mg): {Math.round(props.nutrients.carb / props.portion)}
                </li>}
                {props.nutrients.calories > 0 &&
                <li>
                    <AiFillThunderbolt/> Calories (cal): {Math.round(props.nutrients.calories / props.portion)}
                </li>}
            </ul>
            <br/>
            <p>
                <em>(*) These values are only (very) rough estimates based on the ingredients of this recipe.</em>
            </p>
            <p>
                <em>(**) Be noted that these values might be (extremely) inaccurate if one or more ingredients were not
                    defined in our databases.</em>
            </p>
        </section>
    )
}

export default ViewRecipeNutrients;