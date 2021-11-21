import React, {useContext, useEffect, useState} from "react";
import "./Menu.css";
import {Link, useLocation} from "react-router-dom";
import {apiUrl} from "../../helpers/Variables";
import {UserContext} from "../../context/UserContext";
import DashboardSidebar from "./DashboardSidebar";
import DisplayMenu from "./menu/DisplayMenu";
import GenerateMenu from "./menu/GenerateMenu";
import {FaAngleRight} from "react-icons/fa";
import moment from "moment";

const Menu = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isMenuLoaded, setIsMenuLoaded] = useState(false);
    const [isMenuNew, setIsMenuNew] = useState(false);
    const [isValid, setIsValid] = useState(false);
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
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
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
                alert("Menu saved.");
                // setIsMenuExisting(true);
                setIsMenuNew(false);
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.")
            } else {
                alert("Error: " + response.status);
            }
        } catch (error) {
            alert("Unexpected error: " + error);
        }
    }
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
                alert("You are not authorized to complete the request.")
            } else {
                alert("Error: " + response.status);
            }
        } catch (error) {
            alert("Unexpected error: " + error);
        }
    }
    useEffect(() => {
        checkUser();
    }, [location, user]);

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    {isValid ? <>
                        <DisplayMenu user={user} startDate={startDate} endDate={endDate}
                                     data={data} isMenuLoaded={isMenuLoaded}
                                     isMenuNew={isMenuNew}/>
                    </> : <>
                        <section>
                            <header className="section-header">
                                <h1>Menu suggestion</h1>
                                <p>Share with us some details about you, so that we may recommend recipes that suit
                                    you
                                    best.</p>
                            </header>
                            <div className="section-content" style={promptStyles}>
                                <p>It seems your health and routine profile are incomplete.</p>
                                <Link to="/health">
                                    Complete your health profile to receive tailored meal
                                    plans <FaAngleRight/></Link>
                            </div>
                        </section>
                    </>}
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