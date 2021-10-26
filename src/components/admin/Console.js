import React from "react";
import "./Console.css";
import ConsoleSidebar from "./ConsoleSidebar";
import {Route, Switch} from "react-router-dom";
import ManageContent from "./manage/ManageContent";
import ManageMembers from "./manage/ManageMembers";
import ReviewRecipe from "./review/ReviewRecipe";


const Console = () => {
    return (
        <div className="console-container">
            <ConsoleSidebar/>
            <main className="console">
                <Switch>
                    <Route path="/console/manage-content"><ManageContent/></Route>
                    <Route path="/console/manage-members"><ManageMembers/></Route>
                    <Route path="/console/recipe/:id" component={ReviewRecipe}/>
                    {/*<Route path="/console/blog/:id" component={ReviewB)}/>*/}
                    {/*<Route path="/console/video/:id" component={ReviewVideo}/>*/}
                </Switch>
            </main>
        </div>
    )
}

export default Console;