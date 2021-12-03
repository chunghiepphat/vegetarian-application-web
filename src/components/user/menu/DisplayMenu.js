import React, {useContext, useEffect, useState} from "react";
import {menuDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import moment from "moment";
import Panel from "../../commons/elements/containers/Panel";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import DinnerMenu from "./meal/DinnerMenu";
import BreakfastMenu from "./meal/BreakfastMenu";
import LunchMenu from "./meal/LunchMenu";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const DisplayMenu = (props) => {
    // Localizations
    menuDisplayStrings.setLanguage(useContext(LocaleContext));

    let currentDate = new Date;
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    let today = moment(currentDate).format("L");
    let tomorrow = moment(nextDate).format("L");
    let isMenuExpired = moment(currentDate).format() > moment(props.endDate).format();

    // Handles date picker
    const [menuIndex, setMenuIndex] = useState(0);
    const nextIndex = (e) => {
        e.preventDefault();
        if (menuIndex < 6) setMenuIndex(menuIndex + 1);
        else setMenuIndex(0);
    }
    const prevIndex = (e) => {
        e.preventDefault();
        if (menuIndex > 0) setMenuIndex(menuIndex - 1);
        else setMenuIndex(6);
    }
    useEffect(() => {
        for (let i = 0; i < props.data.length; i++) {
            if (today === moment(props.data[i].date).format("L")) {
                setMenuIndex(i)
            }
        }
    }, [props.data])

    // Calculates daily total calories
    let total;
    if (props.data && props.data.length > 0
        && props.data[menuIndex].listRecipe && props.data[menuIndex].listRecipe.length > 0) {
        total = props.data[menuIndex].listRecipe[0].calo + props.data[menuIndex].listRecipe[1].calo + props.data[menuIndex].listRecipe[2].calo;
        console.log(total)
        if (props.data[menuIndex].listSnack.length > 0) total = total + props.data[menuIndex].listSnack[0].calo;
        if (props.data[menuIndex].listSnack.length > 1) total = total + props.data[menuIndex].listSnack[1].calo;
        if (props.data[menuIndex].listSnack.length > 2) total = total + props.data[menuIndex].listSnack[2].calo;
    }

    return (
        <section style={{borderTop: "thin solid lightgray"}}>
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
                    <div className="menu">
                        <Panel className="menu__content-panel">
                            <BreakfastMenu data={props.data[menuIndex]}/>
                            <LunchMenu data={props.data[menuIndex]}/>
                            <DinnerMenu data={props.data[menuIndex]}/>
                        </Panel>
                    </div> : <>
                        {props.isMenuNew ? <SectionEmp message={menuDisplayStrings.menuMessageNoRecipes}/>
                            : <SectionEmp message={menuDisplayStrings.menuMessageEmptyMenu}/>}
                    </>}
                {props.data && props.data.length > 0 &&
                <div className="sticky-bottom">
                    <div className="menu__date-picker">
                        <button className="menu__date-button"
                                onClick={e => prevIndex(e)}><FaAngleLeft/></button>
                        <select className="menu__date-dropdown" value={menuIndex}
                                onChange={e => setMenuIndex(parseInt(e.target.value))}>
                            {props.data.map((item, index) => (
                                <option key={item.date} value={index}>
                                    {moment(item.date).format("L")}
                                    {today === moment(item.date).format("L") && ` (${menuDisplayStrings.menuToday})`}
                                    {tomorrow === moment(item.date).format("L") && ` (${menuDisplayStrings.menuTomorrow})`}
                                    {` - ${total} cal`}
                                </option>))}
                        </select>
                        <button className="menu__date-button"
                                onClick={e => nextIndex(e)}><FaAngleRight/></button>
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default DisplayMenu;

