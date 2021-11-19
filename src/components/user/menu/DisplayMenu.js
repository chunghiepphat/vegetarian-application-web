import React from "react";
import moment from "moment";
import Panel from "../../commons/elements/containers/Panel";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";

const DisplayMenu = (props) => {
    let currentDate = new Date;
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    let today = moment(currentDate).format("L");
    let tomorrow = moment(nextDate).format("L");
    let isMenuExpired = moment(currentDate).format() > moment(props.endDate).format();

    return (
        <section>
            <header className="section-header">
                {!props.isMenuLoaded ? <>
                    <h1>Menu suggestion</h1>
                    <p>Click "Generate a new menu" to get started.</p>
                </> : <>
                    {!props.isMenuNew ? <>
                        <h1>
                            Your menu from {moment(props.startDate).format("L")} to {moment(props.endDate).format("L")}
                        </h1>
                        {!isMenuExpired ? <p>Showing your saved menu.</p>
                            : <p>This menu has expired, please click "Generate a new menu" to get another.</p>}
                    </> : <>
                        <h1>Your new menu</h1>
                        <p>If you like a menu we suggest, save it for later use.</p>
                    </>}
                </>}
            </header>
            <div className="section-content">
                {props.data && props.data.length > 0 ?
                    <div className="menu-week">
                        {props.data.map(day => (
                            <details className="menu-day"
                                // Hide the menus of past days
                                     {...(today > moment(day.date).format("L") ? {style: {}} : {})}
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
                                            <ArticleTile className="tile-small"
                                                         key={meal.recipe_id}
                                                         id={meal.recipe_id}
                                                         type="recipe"
                                                         title={meal.recipe_title}
                                                         thumbnail={meal.recipe_thumbnail}
                                                         firstName={meal.first_name}
                                                         lastName={meal.last_name}
                                                         time={meal.time}/>
                                        </div>))}
                                </Panel>
                            </details>))}
                    </div> : <>
                        {props.isMenuNew ? <SectionEmp
                                message="Apologies, it seems we couldn't find enough recipes suitable for you... Please check again later."/>
                            : <SectionEmp message="It seems you don't have a saved menu yet."/>}
                    </>
                }
            </div>
        </section>
    )
}

export default DisplayMenu;

