import React, {useContext} from "react";
import {viewDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {AiFillThunderbolt, IoMdNutrition} from "react-icons/all";

const RecipeNutrients = (props) => {
    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));
    genericStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="article-list">
            {props.nutrients ? <>
                <h2>{viewDisplayStrings.viewRecipeNutrients}</h2>
                <ul>
                    {props.nutrients.protein > 0 && <li>
                        <IoMdNutrition/> {genericStrings.protein}: {Math.round(props.nutrients.protein / props.portion)}
                    </li>}
                    {props.nutrients.fat > 0 && <li>
                        <IoMdNutrition/> {genericStrings.fat}: {Math.round(props.nutrients.fat / props.portion)}
                    </li>}
                    {props.carb > 0 && <li>
                        <IoMdNutrition/> {genericStrings.carb}: {Math.round(props.nutrients.carb / props.portion)}
                    </li>}
                    {props.nutrients.calories > 0 && <li>
                        <AiFillThunderbolt/> {genericStrings.calories}: {Math.round(props.nutrients.calories / props.portion)}
                    </li>}
                </ul>
                <br/>
                <p><em>(*) {viewDisplayStrings.viewRecipeNutritionalEstimationDisclaimer}</em></p>
                <p><em>(**) {viewDisplayStrings.viewRecipeNutritionalAccuracyDisclaimer}</em></p>
            </> : <em>{viewDisplayStrings.viewRecipeNutrientsInvalid}</em>}
        </section>
    )
}

export default RecipeNutrients;