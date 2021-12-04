import React from "react";
import {menuDisplayStrings} from "../../../../resources/UserDisplayStrings";
import ArticleTile from "../../../commons/elements/containers/ArticleTile";

const LunchMenu = ({data}) => {
    // Calculates total calories per meal
    let total = data.listRecipe[1].calo
    if (data.listSnack.length > 0) total = total + data.listSnack[0].calo;
    if (data.listSnack.length > 2) { // Checks if the third dish was appended to lunch
        if (data.listSnack[1].calo + data.listSnack[2].calo > data.listSnack[0].calo) {
            total = total + data.listSnack[2].calo;
        }
    }

    return (
        <div className="menu__meal">
            <div className="menu__dish">
                <h3>{menuDisplayStrings.menuLunch}</h3>
                <i>{menuDisplayStrings.menuAbout} {data.listRecipe[1].calo} calories</i>
                <ArticleTile className="tile--menu-dish"
                             key={data.listRecipe[1].recipe_id}
                             id={data.listRecipe[1].recipe_id}
                             type="recipe"
                             title={data.listRecipe[1].recipe_title}
                             thumbnail={data.listRecipe[1].recipe_thumbnail}
                             firstName={data.listRecipe[1].first_name}
                             lastName={data.listRecipe[1].last_name}
                             time={data.listRecipe[1].time}/>
            </div>
            <div className="meal__supplements">
                {data && data.listSnack.length > 0 && <>
                    <h3>{menuDisplayStrings.menuSideDishes}</h3>
                    <div className="meal__side-dishes">
                        <div className="menu__dish">
                            <h3>{data.listSnack[0].meal_of_day}</h3>
                            <i>{menuDisplayStrings.menuAbout} {data.listSnack[0].calo} calories</i>
                            <ArticleTile className="tile--menu-snack"
                                         key={data.listSnack[0].recipe_id}
                                         id={data.listSnack[0].recipe_id}
                                         type="recipe"
                                         title={data.listSnack[0].recipe_title}
                                         thumbnail={data.listSnack[0].recipe_thumbnail}
                                         firstName={data.listSnack[0].first_name}
                                         lastName={data.listSnack[0].last_name}
                                         time={data.listSnack[0].time}/>
                        </div>
                        {data && data.listSnack.length > 2 && <>
                            {data.listSnack[1].calo + data.listSnack[2].calo > data.listSnack[0].calo &&
                            <div className="menu__dish">
                                <h3>{data.listSnack[2].meal_of_day}</h3>
                                <i>{menuDisplayStrings.menuAbout} {data.listSnack[2].calo} calories</i>
                                <ArticleTile className="tile--menu-snack"
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

export default LunchMenu;