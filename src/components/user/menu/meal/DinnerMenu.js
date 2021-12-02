import React from "react";
import {menuDisplayStrings} from "../../../../resources/UserDisplayStrings";
import ArticleTile from "../../../commons/elements/containers/ArticleTile";

const DinnerMenu = ({data}) => {
    // Calculates total calories per meal
    let total = data.listRecipe[2].calo
    if (data.listSnack.length > 1) total = total + data.listSnack[0].calo;
    if (data.listSnack.length > 2) {
        if (data.listSnack[1].calo + data.listSnack[2].calo < data.listSnack[0].calo) {
            total = total + data.listSnack[2].calo;
        }
    }

    return (
        <div className="menu__meal">
            {data && data.listRecipe.length > 0 &&
            // Main dish / meal
            <div className="menu__dish">
                <h3>{menuDisplayStrings.menuDinner}</h3>
                <i>{menuDisplayStrings.about} {data.listRecipe[2].calo} calories</i>
                <ArticleTile className="tile-a--menu-dish"
                             key={data.listRecipe[2].recipe_id}
                             id={data.listRecipe[2].recipe_id}
                             type="recipe"
                             title={data.listRecipe[2].recipe_title}
                             thumbnail={data.listRecipe[2].recipe_thumbnail}
                             firstName={data.listRecipe[2].first_name}
                             lastName={data.listRecipe[2].last_name}
                             time={data.listRecipe[2].time}/>
            </div>}
            <div className="meal__supplements">
                {data && data.listSnack.length > 1 && <>
                    <h3>{menuDisplayStrings.menuSideDishes}</h3>
                    <div className="meal__supplements--content">
                        <div className="menu__dish">
                            <h3>{data.listSnack[1].meal_of_day}</h3>
                            <i>{menuDisplayStrings.about} {data.listSnack[1].calo} calories</i>
                            <ArticleTile className="tile-a--menu-snack"
                                         key={data.listSnack[1].recipe_id}
                                         id={data.listSnack[1].recipe_id}
                                         type="recipe"
                                         title={data.listSnack[1].recipe_title}
                                         thumbnail={data.listSnack[1].recipe_thumbnail}
                                         firstName={data.listSnack[1].first_name}
                                         lastName={data.listSnack[1].last_name}
                                         time={data.listSnack[1].time}/>
                        </div>
                        {data && data.listSnack.length > 2 && <>
                            {data.listSnack[1].calo + data.listSnack[2].calo < data.listSnack[0].calo &&
                            <div className="menu__dish">
                                <h3>{data.listSnack[2].meal_of_day}</h3>
                                <i>{menuDisplayStrings.about} {data.listSnack[2].calo} calories</i>
                                <ArticleTile className="tile-a--menu-snack"
                                             key={data.listSnack[2].recipe_id}
                                             id={data.listSnack[2].recipe_id}
                                             type="recipe"
                                             title={data.listSnack[2].recipe_title}
                                             thumbnail={data.listSnack[2].recipe_thumbnail}
                                             firstName={data.listSnack[2].first_name}
                                             lastName={data.listSnack[2].last_name}
                                             time={data.listSnack[2].time}/>
                            </div>}
                        </>}
                    </div>
                </>}
            </div>
            <div className="meal__nutrients">
                <h3>{menuDisplayStrings.menuMealNutrients}</h3>
                {total &&
                <p>{total} cal</p>}
            </div>
        </div>
    )
}

export default DinnerMenu;