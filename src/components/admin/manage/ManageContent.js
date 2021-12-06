import React, {useContext, useState} from "react";
import {UserContext} from "../../../context/UserContext";
import Navbar from "../../commons/elements/bars/Navbar";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import ListRecipes from "./content/ListRecipes";
import ListVideos from "./content/ListVideos";
import ListBlogs from "./content/ListBlogs";
import {articleStatusStrings} from "../../../resources/CommonDisplayStrings";
import {consoleDisplayStrings} from "../../../resources/AdminDisplayStrings";
import { LocaleContext } from "context/LocaleContext";


const ManageContent = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState("1");
    const fetchData = async (api, data, setData) => {
        setIsError(false);
        setIsLoading(true);
        let headers = new Headers();
        if (token) headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        }
        try {
            const response = await fetch(`${api}${filter > 0 ? `&status=${filter}` : ``}`, request);
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
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
    consoleDisplayStrings.setLanguage(useContext(LocaleContext));
    articleStatusStrings.setLanguage(useContext(LocaleContext));
    return (
        <section>
            <header className="console-header">
                <h1>{consoleDisplayStrings.consoleHeader}</h1>

                <Navbar>
                    <label>{consoleDisplayStrings.consoleFilter}
                        <select value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value={"0"}>{consoleDisplayStrings.consoleFilterAll}</option>
                            <option value={"1"}>{articleStatusStrings.statusPendingShort}</option>
                            <option value={"2"}>{articleStatusStrings.statusApprovedShort}</option>
                            <option value={"3"}>{articleStatusStrings.statusRejectedShort}</option>
                        </select>
                    </label>
                    <NavLink to={`/console/manage-content/recipes`}>{consoleDisplayStrings.consoleRecipeNav}</NavLink>
                    <NavLink to={`/console/manage-content/videos`}>{consoleDisplayStrings.consoleVideoNav}</NavLink>
                    <NavLink to={`/console/manage-content/blogs`}>{consoleDisplayStrings.consoleBlogNav}</NavLink>
                </Navbar>
            </header>
            <div className="console-content">

                <Switch>
                    <Route path={`/console/manage-content/recipes`}>
                        <ListRecipes user={user} location={location} filter={filter}
                                     isLoading={isLoading} isError={isError}
                                     fetchData={fetchData}/> </Route>
                    <Route path={`/console/manage-content/videos`}>
                        <ListVideos user={user} location={location} filter={filter}
                                    isLoading={isLoading} isError={isError}
                                    fetchData={fetchData}/> </Route>
                    <Route path={`/console/manage-content/blogs`}>
                        <ListBlogs user={user} location={location} filter={filter}
                                   isLoading={isLoading} isError={isError}
                                   fetchData={fetchData}/> </Route>
                    <Route><Redirect to={`/console/manage-content/recipes`}/></Route>
                </Switch>
            </div>
        </section>
    )
}

export default ManageContent;