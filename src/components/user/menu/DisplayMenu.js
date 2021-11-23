import React from "react";
import moment from "moment";
import Panel from "../../commons/elements/containers/Panel";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import LocalizedStrings from "react-localization";

const DisplayMenu = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            menuHeader: "Menu suggestion",
            menuMessageHeader: "Click \"Generate a new menu\" to get started.",
            menuMessageEmpty: "It seems you don't have a saved menu yet.",
            newMenuHeader: "Your new menu",
            newMenuMessageHeader: "If you like a menu we suggest, save it for later use.",
            savedMenuHeader: "Your menu from",
            savedMenuHeaderTo: "to",
            savedMenuMessageHeader: "Showing your saved menu.",
            expiredMenuMessage: "This menu has expired, please click \"Generate a new menu\" to get another.",
            menuToday: "Today",
            menuTomorrow: "Tomorrow",
            errorMenuMessage: "Apologies, it seems we couldn't find enough recipes suitable for you... Please check again later.",
            aboutMessage: "About",
        },
        vi: {
            menuHeader: "Đề xuất thực đơn",
            menuMessageHeader: "Nhấn nút \"Tạo menu mới\" để bắt đầu.",
            menuMessageEmpty: "Có vẻ như bạn chưa có lưu thực đơn nào.",
            newMenuHeader: "Thực đơn mới của bạn",
            newMenuMessageHeader: "Nếu bạn thích thực đơn chúng tôi vừa đề xuất, lưu lại để sử dụng sau này.",
            savedMenuHeader: "Thực đơn của bạn từ",
            savedMenuHeaderTo: "đến",
            savedMenuMessageHeader: "Đang hiện thực đơn bạn đã lưu",
            expiredMenuMessage: "Thực đơn này đã quá hạn, xin hãy nhấn nút \"Tạo menu mới\" để lấy thực đơn mới",
            menuToday: "Hôm nay",
            menuTomorrow: "Ngày mai",
            errorMenuMessage: "Xin lỗi, có vẻ như chúng tôi không đủ công thức phù hợp với bạn... Vui lòng thử lại sau.",
            aboutMessage: "Khoảng",
        }
    });

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
                    <h1>{strings.menuHeader}</h1>
                    <p>{strings.menuMessageHeader}</p>
                </> : <>
                    {!props.isMenuNew ? <>
                        <h1>
                            {strings.savedMenuHeader} {moment(props.startDate).format("L")} {strings.savedMenuHeaderTo} {moment(props.endDate).format("L")}
                        </h1>
                        {!isMenuExpired ? <p>{strings.savedMenuMessageHeader}</p>
                            : <p>{strings.expiredMenuMessage}</p>}
                    </> : <>
                        <h1>{strings.newMenuHeader}</h1>
                        <p>{strings.newMenuMessageHeader}</p>
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
                                    {today === moment(day.date).format("L") && <> ({strings.menuToday})</>}
                                    {tomorrow === moment(day.date).format("L") && <> ({strings.menuTomorrow})</>}
                                </summary>
                                <Panel>
                                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                                    {day.listRecipe.map(meal => (
                                        <div className="menu-meal">
                                            <h3>{meal.meal_of_day}</h3>
                                            <i>{strings.aboutMessage} {meal.calo} calories</i>
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
                                message={strings.errorMenuMessage}/>
                            : <SectionEmp message={strings.menuMessageEmpty}/>}
                    </>
                }
            </div>
        </section>
    )
}

export default DisplayMenu;

