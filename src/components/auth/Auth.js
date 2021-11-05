import React from "react";
import "./Auth.css";
import bannerBackground from "assets/profile-banner-default.png";
import Register from "./forms/Register";

import {Redirect, Route, Switch} from "react-router-dom";

const Auth = () => {
    return (
        <div className="page-container page-full">
            <div className="grid-container">
                <main className="auth-container">
                    <Switch>
                        <Route exact path="/auth/register"><Register/></Route>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </div>
            <div className="page-background" style={{backgroundImage: `url(${bannerBackground})`}}>
                <div className="page-overlay"/>
            </div>
        </div>
    )
}

export default Auth;