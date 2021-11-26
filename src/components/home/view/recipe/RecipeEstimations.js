import React, {useContext} from "react";
import {viewDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {FaClock, FaFire} from "react-icons/all";

const RecipeEstimations = ({data}) => {
    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));
    genericStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="article-list">
            <ul>
                {data.recipe_difficulty && <li>
                    <FaFire/> {viewDisplayStrings.viewRecipeEstimatedDifficulty}: {data.recipe_difficulty}</li>}
                {data.prep_time_minutes > 0 && <li>
                    <FaClock/> {viewDisplayStrings.viewRecipeEstimatedPrepTime}: {data.prep_time_minutes} {genericStrings.minutes}
                </li>}
                {data.baking_time_minutes > 0 && <li>
                    <FaClock/> {viewDisplayStrings.viewRecipeEstimatedBakingTime}: {data.baking_time_minutes} {genericStrings.minutes}
                </li>}
                {data.resting_time_minutes > 0 && <li>
                    <FaClock/> {viewDisplayStrings.viewRecipeEstimatedRestingTime}: {data.resting_time_minutes} {genericStrings.minutes}
                </li>}
            </ul>
        </section>
    )
}

export default RecipeEstimations;