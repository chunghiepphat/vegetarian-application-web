import React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import ConsoleReviewRecipe from "./review/ConsoleReviewRecipe";
import ConsoleReviewVideo from "./review/ConsoleReviewVideo";
import ConsoleReviewBlog from "./review/ConsoleReviewBlog";
import ConsoleReviewUser from "./review/ConsoleReviewUser";
import {FaAngleLeft} from "react-icons/fa";

const ConsoleReview = () => {
    const location = useLocation();

    return (
        <section>
            {!location.pathname.match("/console/review/user") &&
            <header className="console-header">
                <a href="javascript:history.back()"><FaAngleLeft/> Go back</a>
            </header>}
            <Switch>
                <Route path="/console/review/recipe/:id"><ConsoleReviewRecipe/></Route>
                <Route path="/console/review/video/:id"><ConsoleReviewVideo/></Route>
                <Route path="/console/review/blog/:id"><ConsoleReviewBlog/></Route>
                <Route path="/console/review/user/:id"><ConsoleReviewUser/></Route>
                <Route><Redirect to="/console"/></Route>
            </Switch>
        </section>
    )
}

export default ConsoleReview;