import React from "react";
import "./Console.css";
import {Redirect, Route, Switch} from "react-router-dom";
import ConsoleHome from "./ConsoleHome";
import ConsoleSidebar from "./ConsoleSidebar";
import ManageContent from "./manage/ManageContent";
import ManageUsers from "./manage/ManageUsers";
import ReviewRecipe from "./review/ReviewRecipe";
import ReviewVideo from "./review/ReviewVideo";
import ReviewBlog from "./review/ReviewBlog";
import ReviewAccount from "./review/ReviewAccount";
import ManageCategories from "./manage/ManageCategories";

const Console = () => {
    return (
        <div className="console-container">
            <ConsoleSidebar/>
            <main className="console">
                <Switch>
                    <Route exact path="/console"><ConsoleHome/></Route>
                    <Route path="/console/manage-content"><ManageContent/></Route>
                    <Route path="/console/manage-categories"><ManageCategories/></Route>
                    <Route path="/console/manage-members"><ManageUsers/></Route>
                    <Route path="/console/recipe/:id"><ReviewRecipe/></Route>
                    <Route path="/console/video/:id"><ReviewVideo/></Route>
                    <Route path="/console/blog/:id"><ReviewBlog/></Route>
                    <Route path="/console/user/:id"><ReviewAccount/></Route>
                    <Route><Redirect to="/console"/></Route>
                </Switch>
            </main>
        </div>
    )
}

export default Console;