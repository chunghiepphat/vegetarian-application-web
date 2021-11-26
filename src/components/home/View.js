import React, {useContext} from "react";
import "./View.css";
import {UserContext} from "../../context/UserContext";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import HomeSidebar from "./HomeSidebar";
import ViewRecipe from "./view/ViewRecipe";
import ViewVideo from "./view/ViewVideo";
import ViewBlog from "./view/ViewBlog";
import ViewUser from "./view/ViewUser";

const View = () => {
    const location = useLocation();

    // Gets user info
    const user = useContext(UserContext);

    // Fetches article with parameters and states passed from child components
    const fetchData = async (api, setData, setIsError, setIsLoading) => {
        setIsError(false);
        setIsLoading(true);
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                setData(result);
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

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <Switch>
                        <Route path="/view/recipe/:id">
                            <ViewRecipe user={user} location={location} fetchData={fetchData}/> </Route>
                        <Route path="/view/video/:id">
                            <ViewVideo user={user} location={location} fetchData={fetchData}/> </Route>
                        <Route path="/view/blog/:id">
                            <ViewBlog user={user} location={location} fetchData={fetchData}/> </Route>
                        <Route path="/view/user/:id">
                            <ViewUser user={user}/> </Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default View;