import React, {} from "react";
import Panel from "../../commons/elements/containers/Panel";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import Tile from "../../commons/elements/containers/Tile";
import moment from "moment";

const MenuView = (props) => {
    let currentDate = new Date;
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    let today = moment(currentDate).format("L");
    let tomorrow = moment(nextDate).format("L");

    return (
        <section>
            <header className="section-header">
                {props.isNew ?
                    <h1>Your new menu</h1>
                    :
                    <h1>Your currently suggested menu for this week</h1>
                }
                <p>If you like a menu we suggest, save it for later use.</p>
            </header>
            <div className="section-content">
                {props.data &&
                <div className="menu-week">
                    {props.data.length > 0 ?
                        props.data.map(day => (
                            <details className="menu-day"
                                // Hide the menus of past days
                                     {...(today > moment(day.date).format("L") ? {style: {display: "none"}} : {})}
                                // Expand the menu for current day
                                     {...(today === moment(day.date).format("L") ? {open: true} : {})}
                                // Expand the menu for the next day
                                     {...(tomorrow === moment(day.date).format("L") ? {open: true} : {})}>
                                {/*Display the menu with its matching date*/}
                                <summary>{moment(day.date).format("L")}
                                    {today === moment(day.date).format("L") && <> (Today)</>}
                                    {tomorrow === moment(day.date).format("L") && <> (Tomorrow)</>}
                                </summary>
                                <Panel>
                                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                                    {day.listRecipe.map(meal => (
                                        <div className="menu-meal">
                                            <h3>{meal.meal_of_day}</h3>
                                            <i>About {meal.calo} calories</i>
                                            <Tile className="tile-small"
                                                  key={meal.recipe_id}
                                                  id={meal.recipe_id}
                                                  type="recipe"
                                                  title={meal.recipe_title}
                                                  thumbnail={meal.recipe_thumbnail}
                                                  firstName={meal.first_name}
                                                  lastName={meal.last_name}
                                                  time={meal.time}/>
                                        </div>
                                    ))}
                                </Panel>
                            </details>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>}
            </div>
        </section>
    )
}

export default MenuView;

