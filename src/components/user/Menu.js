import React, {useContext, useEffect, useState} from "react";
import "./Menu.css";
import {requestErrorStrings} from "../../resources/CommonDisplayStrings";
import {menuDisplayStrings} from "../../resources/UserDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {UserContext} from "../../context/UserContext";
import {apiUrl} from "../../helpers/Variables";
import {Link} from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DisplayMenu from "./menu/DisplayMenu";
import GenerateMenu from "./menu/GenerateMenu";
import {FaAngleRight} from "react-icons/fa";

const Menu = () => {
    // Localizations
    menuDisplayStrings.setLanguage(useContext(LocaleContext));
    requestErrorStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // CSS styles
    const promptStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "600px",
        padding: "60px 0",
    }

    // Checks if user has specified health and routine details
    const checkUser = () => {
        if (user.height > 0 && user.weight > 0
            && user.gender !== null && user.birth_date !== null
            && user.workout_routine !== null) {
            setIsValid(true);
            loadMenu();
        } else setIsValid(false);
    }
    useEffect(() => {
        checkUser();
    }, [user]);

    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Gets saved menu
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isMenuLoaded, setIsMenuLoaded] = useState(false);
    const [isMenuNew, setIsMenuNew] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const loadMenu = async () => {
        let currentDate = new Date;
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiUrl}/menu/details/${user.id}`
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                const result = await response.json();
                setStartDate(result.startDate);
                setEndDate(result.endDate);
                setData(result.menu);
                setIsMenuLoaded(true);
                setIsMenuNew(false);
            }
        } catch
            (error) {
            alert("Unexpected error: " + error);
        }
    }

    // Saves new menu to profile
    const saveMenu = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "menu": data,
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/menu/add/${user.id}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert(menuDisplayStrings.menuSaved);
                // setIsMenuExisting(true);
                setIsMenuNew(false);
                checkUser();
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    // Generates new menu
    const generateMenu = async (e) => {
        e.preventDefault();
        // Request headers with access token
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiUrl}/menu/generate?id=${user.id}`
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                const result = await response.json();
                setData(result.menu);
                setIsMenuLoaded(true);
                setIsMenuNew(true);
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    {isValid ?
                        <DisplayMenu user={user} startDate={startDate} endDate={endDate}
                                     data={data} isMenuLoaded={isMenuLoaded}
                                     isMenuNew={isMenuNew}/>
                        : <section>
                            <header className="section-header">
                                <h1>{menuDisplayStrings.menuHeader}</h1>
                                <p>{menuDisplayStrings.menuSubheader}</p>
                            </header>
                            <div className="section-content" style={promptStyles}>
                                <p>{menuDisplayStrings.menuMessageProfileIncomplete}</p>
                                <Link to="/health">
                                    {menuDisplayStrings.menuUrlCompleteProfile} <FaAngleRight/></Link>
                            </div>
                        </section>}
                    {isValid &&
                    <GenerateMenu user={user} generate={generateMenu} isMenuLoaded={isMenuLoaded}
                                  isMenuNew={isMenuNew} save={saveMenu} load={loadMenu}/>}
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Menu;