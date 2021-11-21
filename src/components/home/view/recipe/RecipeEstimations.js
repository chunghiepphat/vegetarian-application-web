import React from "react";
import LocalizedStrings from "react-localization";
import {FaClock, FaFire} from "react-icons/all";

const RecipeEstimations = ({data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            difficulty: "Difficulty",
            prepTime: "Prep time",
            bakingTime: "Baking time",
            restingTime: "Resting time",
            minutes: "minutes",
        },
        vi: {
            difficulty: "Độ khó",
            prepTime: "Chế biến",
            bakingTime: "Nướng",
            restingTime: "Để món nghỉ",
            minutes: "phút",
        }
    });

    return (
        <section className="article-list">
            <ul>
                {data.recipe_difficulty && <li>
                    <FaFire/> {strings.difficulty}: {data.recipe_difficulty}</li>}
                {data.prep_time_minutes > 0 && <li>
                    <FaClock/> {strings.prepTime}: {data.prep_time_minutes} {strings.minutes}</li>}
                {data.baking_time_minutes > 0 && <li>
                    <FaClock/> {strings.bakingTime}: {data.baking_time_minutes} {strings.minutes}</li>}
                {data.resting_time_minutes > 0 && <li>
                    <FaClock/> {strings.restingTime}: {data.resting_time_minutes} {strings.minutes}</li>}
            </ul>
        </section>
    )
}

export default RecipeEstimations;