import React, {useContext, useEffect, useState} from "react";
import "./Menu.css";
import DashboardSidebar from "./DashboardSidebar";
import DisplayMenu from "./menu/DisplayMenu";
import GenerateMenu from "./menu/GenerateMenu";
import {UserContext} from "../../context/UserContext";
import {apiBase} from "../../helpers/Variables";

const Menu = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);
    const [isNew, setIsNew] = useState(false);
    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const loadMenu = async () => {
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
        const api = `${apiBase}/menu/details/${user.id}`
        const response = await fetch(api, request);
        const result = await response.json();
        console.log(result.menu);
        setData(result.menu);
        setIsNew(false);
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
        const api = `${apiBase}/menu/add/${user.id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Menu saved.");
            setIsNew(false);
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
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
        const api = `${apiBase}/menu/generate?id=${user.id}`
        const response = await fetch(api, request);
        const result = await response.json();
        console.log(result.menu);
        setData(result.menu);
        setIsNew(true);
    }
    useEffect(() => {
        loadMenu().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <DisplayMenu data={data} isNew={isNew}/>
                    <GenerateMenu generate={generateMenu} isNew={isNew}
                                  save={saveMenu} load={loadMenu}/>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default Menu;