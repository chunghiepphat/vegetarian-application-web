import React from "react";
import Navbar from "../commons/elements/bars/Navbar";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import UpdateProfile from "./update/UpdateProfile";
import HistoryBlogs from "./history/HistoryBlogs";
import HistoryRecipes from "./history/HistoryRecipes";
import HistoryVideos from "./history/HistoryVideos";
import HistoryComments from "./history/HIstoryComments";
import DashboardSidebar from "./DashboardSidebar";
import HistoryFavorites from "./history/HistoryFavorites";

const History = () => {
    const urlRecipes = "/history/recipes";
    const urlVideos = "/history/videos";
    const urlBlogs = "/history/blogs";
    const urlComments = "/history/comments";
    const urlFavorites = "/history/favorites";

    return (
        <div className="page-container">
            <div className="grid-container">
                <main>
                    <section className="page-navbar">
                        <Navbar>
                            <Link to={urlRecipes}>Your recipes</Link>
                            <Link to={urlVideos}>Your videos</Link>
                            <Link to={urlBlogs}>Your blogs</Link>
                            <Link to={urlComments}>Your comments</Link>
                            <Link to={urlFavorites}>Your Favorites</Link>
                        </Navbar>
                    </section>
                    <Switch>
                        <Route exact path="/history"><Redirect to={urlRecipes}/></Route>
                        <Route exact path={urlRecipes}><HistoryRecipes/></Route>
                        <Route exact path={urlVideos}><HistoryVideos/></Route>
                        <Route exact path={urlBlogs}><HistoryBlogs/></Route>
                        <Route exact path={urlComments}><HistoryComments/></Route>
                        <Route exact path={urlFavorites}><HistoryFavorites/></Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                <DashboardSidebar/>
            </div>
        </div>
    )
}

export default History;