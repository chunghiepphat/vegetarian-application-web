import React from "react";
import "./Console.css";
import ConsoleSidebar from "./ConsoleSidebar";
import {Route, Switch} from "react-router-dom";
import ManageContent from "./manage/ManageContent";
import ManageUsers from "./manage/ManageUsers";
import ReviewRecipe from "./review/ReviewRecipe";
import ReviewUser from "./review/ReviewUser";


const Console = () => {
    return (
        <div className="console-container">
            <ConsoleSidebar/>
            <main className="console">
                <Switch>
                    <Route path="/console/manage-content"><ManageContent/></Route>
                    <Route path="/console/manage-members"><ManageUsers/></Route>
                    <Route path="/console/recipe/:id" component={ReviewRecipe}/>
                    {/*<Route path="/console/video/:id" component={ReviewVideo}/>*/}
                    {/*<Route path="/console/blog/:id" component={ReviewBlog)}/>*/}
                    <Route path="/console/user/:id" component={ReviewUser}/>
                </Switch>
            </main>
        </div>
    )
}

export default Console;