import React from "react";
import LocalizedStrings from "react-localization";
import {FaLeaf} from "react-icons/all";

const RecipeIngredients = ({data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Ingredients",
            per: "per",
            servings: "serving(s)",
            pieces: "piece(s)",
            grams: "(grams)",
            noIngredientMessage: "It seems the creator of this recipe did not specify any ingredients...",
        },
        vi: {
            header: "Nguyên liệu",
            per: "cho",
            servings: "khẩu phần ăn",
            pieces: "miếng",
            grams: "(gam)",
            noIngredientMessage: "Có vẻ như tác giả của công thức này đã không liệt kê bất kỳ nguyên liệu nào...",
        }
    });

    return (
        <section className="article-list">
            {data.ingredients && data.ingredients.length > 0 ? <>
                <h2>{strings.header}</h2>
                <p>{strings.per} {data.portion_size}
                    {/* eslint-disable-next-line eqeqeq */}
                    {data.portion_type == 1 && <> {strings.servings}</>}
                    {/* eslint-disable-next-line eqeqeq */}
                    {data.portion_type == 2 && <> {strings.pieces}</>}</p>
                <ul>
                    {data.ingredients.map(ingredient => (
                        <li><FaLeaf/> {ingredient.ingredient_name} - {ingredient.amount_in_mg} {strings.grams}</li>))}
                </ul>
            </> : <em>{strings.noIngredientMessage}</em>}
        </section>
    )
}

export default RecipeIngredients;