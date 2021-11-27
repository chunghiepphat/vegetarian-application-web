import React, {useContext} from "react";
import {viewDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {FaClock, FaFire} from "react-icons/all";

const RecipeEstimations = ({data}) => {
    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));
    genericStrings.setLanguage(useContext(LocaleContext));

    let difficulty;
    switch (data.recipe_difficulty) {
        case 1:
            difficulty = genericStrings.beginner;
            break;
        case 2:
            difficulty = genericStrings.novice;
            break;
        case 3:
            difficulty = genericStrings.cook;
            break;
        case 4:
            difficulty = genericStrings.chef;
            break;
        case 5:
            difficulty = genericStrings.gordonRamsay;
            break;
    }

    return (
        <section className="article-list">
            <ul>
                {data.recipe_difficulty && <li>
                    <FaFire/> {viewDisplayStrings.viewRecipeEstimatedDifficulty}: {difficulty}</li>}
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