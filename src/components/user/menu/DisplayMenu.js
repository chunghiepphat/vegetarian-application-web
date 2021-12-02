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

    // CSS Styles
    const buttonStyles = {
        maxWidth: "40px",
        background: "white",
        boxShadow: "none",
    }
    const dropdownStyles = {
        height: "60px",
        fontSize: "22px",
    }
    let currentDate = new Date;
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    let today = moment(currentDate).format("L");
    let tomorrow = moment(nextDate).format("L");
    let isMenuExpired = moment(currentDate).format() > moment(props.endDate).format();

    // Handles date picker
    const [menuIndex, setMenuIndex] = useState();
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
                    <div className="menu">
                        {menuIndex !== undefined &&
                        <Panel className="menu__content-panel">
                            <BreakfastMenu data={props.data[menuIndex]}/>
                            <LunchMenu data={props.data[menuIndex]}/>
                            <DinnerMenu data={props.data[menuIndex]}/>
                        </Panel>}
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

