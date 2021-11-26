import React, {useContext} from "react";
import {menuDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import moment from "moment";
import Panel from "../../commons/elements/containers/Panel";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";

const DisplayMenu = (props) => {
    // Localizations
    menuDisplayStrings.setLanguage(useContext(LocaleContext));

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
                    <h1>{menuDisplayStrings.menuHeader}</h1>
                    <p>{menuDisplayStrings.menuSubheaderEmptyMenu}</p>
                </> : <>
                    {!props.isMenuNew ? <>
                        <h1>
                            {menuDisplayStrings.menuSubheaderSavedMenuFrom} {moment(props.startDate).format("L")} {menuDisplayStrings.menuSubheaderSavedMenuTo} {moment(props.endDate).format("L")}
                        </h1>
                        {!isMenuExpired ? <p>{menuDisplayStrings.menuHeaderSavedMenu}</p>
                            : <p>{menuDisplayStrings.menuSubheaderExpiredMenu}</p>}
                    </> : <>
                        <h1>{menuDisplayStrings.menuHeaderNewMenu}</h1>
                        <p>{menuDisplayStrings.menuSubheaderNewMenu}</p>
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
                                    {today === moment(day.date).format("L") && <> ({menuDisplayStrings.menuToday})</>}
                                    {tomorrow === moment(day.date).format("L") && <> ({menuDisplayStrings.menuTomorrow})</>}
                                </summary>
                                <Panel>
                                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                                    {day.listRecipe.map(meal => (
                                        <div className="menu-meal">
                                            <h3>{meal.meal_of_day}</h3>
                                            <i>{menuDisplayStrings.about} {meal.calo} calories</i>
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
                                message={menuDisplayStrings.menuMessageNoRecipes}/>
                            : <SectionEmp message={menuDisplayStrings.menuMessageEmptyMenu}/>}
                    </>
                }
            </div>
        </section>
    )
}

export default DisplayMenu;

