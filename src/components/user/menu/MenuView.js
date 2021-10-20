import React, {} from "react";
import Panel from "../../commons/elements/containers/Panel";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import Tile from "../../commons/elements/containers/Tile";

const MenuView = ({data}) => {
    const date = new Date();
    const weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    let today = weekdays[date.getDay()];
    let tomorrow = weekdays[date.getDay() + 1]

    return (
        <section>
            <header className="section-header">
                <h1>Your menu this week</h1>
            </header>
            <div className="section-content">
                {data &&
                <div className="menu-week">
                    {data.length > 0 ?
                        data.map(day => (
                            <details className="menu-day"
                                     {...(today === day.day_of_week ? {open: true} : {})}
                                     {...(tomorrow === day.day_of_week ? {open: true} : {})}>
                                <summary>{day.day_of_week}
                                    {today === day.day_of_week && <> (Today)</>}
                                    {tomorrow === day.day_of_week && <> (Tomorrow)</>}</summary>
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

