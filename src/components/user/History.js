import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import HistoryBlogs from "./history/HistoryBlogs";
import HistoryRecipes from "./history/HistoryRecipes";
import HistoryVideos from "./history/HistoryVideos";
import DashboardSidebar from "./DashboardSidebar";

const History = () => {
    const urlRecipes = "/history/recipes";
    const urlVideos = "/history/videos";
    const urlBlogs = "/history/blogs";

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <NavLink to={urlRecipes}>Your recipes</NavLink>
                            <NavLink to={urlVideos}>Your videos</NavLink>
                            <NavLink to={urlBlogs}>Your blogs</NavLink>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/history"><Redirect to={urlRecipes}/></Route>
                        <Route exact path={urlRecipes}><HistoryRecipes/></Route>
                        <Route exact path={urlVideos}><HistoryVideos/></Route>
                        <Route exact path={urlBlogs}><HistoryBlogs/></Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default History;