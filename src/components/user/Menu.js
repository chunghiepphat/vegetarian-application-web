import React, {useContext, useEffect, useState} from "react";
import "./Menu.css";
import DashboardSidebar from "./DashboardSidebar";
import MenuView from "./menu/MenuView";
import MenuGenerate from "./menu/MenuGenerate";
import {UserContext} from "../../context/UserContext";
import {apiBase} from "../../helpers/Helpers";
import {useLocation} from "react-router-dom";

const Menu = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);
    const location = useLocation();

    const fetchData = async () => {
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

        const api = `${apiBase}/menu/generate?id=${user.id}`
        const response = await fetch(api, request);
        const result = await response.json();
        console.log(result.menu);
        setData(result.menu);
    }

    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, [location]);

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <MenuGenerate generate={fetchData}/>
                    <MenuView data={data}/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Menu;