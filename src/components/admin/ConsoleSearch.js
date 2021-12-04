import React, {useEffect, useState} from "react";
import {NavLink, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {apiUrl} from "../../helpers/Variables";
import Navbar from "../commons/elements/bars/Navbar";
import ConsoleResultRecipes from "./search/ConsoleResultRecipes";
import ConsoleResultVideos from "./search/ConsoleResultVideos";
import ConsoleResultBlogs from "./search/ConsoleResultBlogs";
import {SectionEmp} from "../commons/elements/loaders/AlertEmpty";
import {SectionLoader} from "../commons/elements/loaders/Loader";
import ConsoleResultUsers from "./search/ConsoleResultUsers";
import {consoleDisplayStrings} from "../../resources/AdminDisplayStrings";
import {articleStatusStrings} from "../../resources/CommonDisplayStrings";

const ConsoleSearch = () => {
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles fetching results
    const [data, setData] = useState()
    const [filter, setFilter] = useState("1");
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiUrl}/home/admin/find${location.search}`;
        try {
            const response = await fetch(api, request)
            if (response.ok) {
                const result = await response.json();
                await setData(result);
                setIsLoading(false);
            } else setIsLoading(false);
        } catch (error) {
            setData(undefined);
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData(); // fetches results again everytime the query changes
    }, [location.search])

    return (
        <section>
            <header className="console-header">
                <h1>Search results</h1>
                <Navbar>
                    {!location.pathname.match("/users") &&
                    <label>{consoleDisplayStrings.consoleFilter}
                        <select value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value={"0"}>{consoleDisplayStrings.consoleFilterAll}</option>
                            <option value={"1"}>{articleStatusStrings.statusPendingShort}</option>
                            <option value={"2"}>{articleStatusStrings.statusApprovedShort}</option>
                            <option value={"3"}>{articleStatusStrings.statusRejectedShort}</option>
                        </select>
                    </label>}
                    <NavLink to={{
                        pathname: "/console/search/recipes",
                        search: location.search,
                    }}>Recipes</NavLink>
                    <NavLink to={{
                        pathname: "/console/search/videos",
                        search: location.search,
                    }}>Videos</NavLink>
                    <NavLink to={{
                        pathname: "/console/search/blogs",
                        search: location.search,
                    }}>Blogs</NavLink>
                    <NavLink to={{
                        pathname: "/console/search/users",
                        search: location.search,
                    }}>Users</NavLink>
                </Navbar>
            </header>
            <div className="console-content">
                {!isLoading ? <>
                    {data ? <>
                        {data.listRecipe.length > 0 || data.listVideo.length > 0 ||
                        data.listBlog.length > 0 || data.listUser.length > 0 ? <>
                            <Switch>
                                <Route path="/console/search/recipes">
                                    <ConsoleResultRecipes data={data.listRecipe}/></Route>
                                <Route path="/console/search/videos">
                                    <ConsoleResultVideos data={data.listVideo}/></Route>
                                <Route path="/console/search/blogs">
                                    <ConsoleResultBlogs data={data.listBlog}/></Route>
                                <Route path="/console/search/users">
                                    <ConsoleResultUsers data={data.listUser}/></Route>
                                <Redirect to={{
                                    pathname: "/console/search/recipes",
                                    search: location.search,
                                }}/>
                            </Switch>
                        </> : <SectionEmp/>}
                    </> : <SectionEmp/>}
                </> : <SectionLoader/>}
            </div>
        </section>
    )
}

export default ConsoleSearch;