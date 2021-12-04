import React from "react";
import {menuDisplayStrings} from "../../../../resources/UserDisplayStrings";
import ArticleTile from "../../../commons/elements/containers/ArticleTile";

const BreakfastMenu = ({data}) => {
    // Calculates total calories per meal
    let total = data.listRecipe[0].calo;

    return (
        <div className="menu__meal">
            <div className="menu__dish">
                <h3>{menuDisplayStrings.menuBreakfast}</h3>
                <i>{menuDisplayStrings.menuAbout} {data.listRecipe[0].calo} calories</i>
                <ArticleTile className="tile--menu-dish"
                             key={data.listRecipe[0].recipe_id}
                             id={data.listRecipe[0].recipe_id}
                             type="recipe"
                             title={data.listRecipe[0].recipe_title}
                             thumbnail={data.listRecipe[0].recipe_thumbnail}
                             firstName={data.listRecipe[0].first_name}
                             lastName={data.listRecipe[0].last_name}
                             time={data.listRecipe[0].time}/>
            </div>
            <div className="meal__supplements"/>
            <div className="meal__nutrients">
                <h3>{menuDisplayStrings.menuMealNutrients}</h3>
                {total &&
                <p>{total} cal</p>}
            </div>
        </div>
    )
}

export default BreakfastMenu;