import React from "react";
import {FaLeaf} from "react-icons/all";

const RecipeIngredients = ({data}) => {
    return (
        <>
            {data.ingredients &&
            <section className="article-list">
                {data.ingredients.length > 0 ? <>
                        <h2>Ingredients</h2>
                        <p>- per {data.portion_size}
                            {/* eslint-disable-next-line eqeqeq */}
                            {data.portion_type == 1 && <> serving(s)</>}
                            {/* eslint-disable-next-line eqeqeq */}
                            {data.portion_type == 2 && <> piece(s)</>}</p>
                        <ul>
                            {data.ingredients.map(ingredient => (
                                <li>
                                    <FaLeaf/> {ingredient.ingredient_name} - {ingredient.amount_in_mg} (mg)
                                </li>
                            ))}
                        </ul>
                    </>
                    : <em>It seems the creator of this recipe did not specify any ingredients...</em>}
            </section>}
        </>
    )
}

export default RecipeIngredients;