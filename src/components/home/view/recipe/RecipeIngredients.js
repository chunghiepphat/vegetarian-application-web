import React, {useContext} from "react";
import {viewDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {FaLeaf} from "react-icons/all";


const RecipeIngredients = ({data}) => {
    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));
    genericStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="article-list">
            {data.ingredients && data.ingredients.length > 0 ? <>
                <h2>{viewDisplayStrings.viewRecipeIngredients}</h2>
                <p>{genericStrings.per} {data.portion_size}
                    {/* eslint-disable-next-line eqeqeq */}
                    {data.portion_type == 1 && <> {genericStrings.servings}</>}
                    {/* eslint-disable-next-line eqeqeq */}
                    {data.portion_type == 2 && <> {genericStrings.pieces}</>}</p>
                <ul>
                    {data.ingredients.map(item => (
                        <li key={item.ingredient_name}>
                            <FaLeaf/> {item.ingredient_name} - {item.amount_in_mg} {genericStrings.grams}
                        </li>))}
                </ul>
            </> : <em>{viewDisplayStrings.viewRecipeIngredientsEmpty}</em>}
        </section>
    )
}

export default RecipeIngredients;