import React, {useContext, useState,useEffect} from "react";
import {useLocation} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import AddCategories from "./categories/AddCategories";
import ListCategories from "./categories/ListCategories";
import { consoleDisplayStrings } from "resources/AdminDisplayStrings";
import { LocaleContext } from "context/LocaleContext";

const ManageCategories = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    let locale = useContext(LocaleContext);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        const api = `${apiUrl}/recipes/categories?translate=${locale}`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    }
    useEffect(fetchData, [user, locale]);
    consoleDisplayStrings.setLanguage(useContext(LocaleContext));
    return (
        <section>
            <header className="console-header">
                <h1>{consoleDisplayStrings.consoleCategoryHeader}</h1>
            </header>
            <div className="console-content">
                <AddCategories user={user} token={token} location={location} reload={fetchData}/>
                <ListCategories user={user} token={token} location={location}
                                data={data} fetchData={fetchData}
                                isLoading={isLoading} isError={isError}/>
            </div>
        </section>
    )
}

export default ManageCategories;