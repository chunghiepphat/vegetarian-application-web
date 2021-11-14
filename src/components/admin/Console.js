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
import ReviewUser from "./review/ReviewUser";

const Console = () => {
    return (
        <div className="console-container">
            <ConsoleSidebar/>
            <main className="console">
                <Switch>
                    <Route exact path="/console"><ConsoleHome/></Route>
                    <Route path="/console/manage-content"><ManageContent/></Route>
                    <Route path="/console/manage-members"><ManageUsers/></Route>
                    <Route path="/console/recipe/:id" component={ReviewRecipe}/>
                    <Route path="/console/video/:id" component={ReviewVideo}/>
                    <Route path="/console/blog/:id" component={ReviewBlog}/>
                    <Route path="/console/user/:id" component={ReviewUser}/>
                    <Route><Redirect to="/console"/></Route>
                </Switch>
            </main>
        </div>
    )
}

export default Console;