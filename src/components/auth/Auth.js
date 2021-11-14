import React, {useEffect, useState} from "react";
import "./Auth.css";
import bannerBackground from "assets/profile-banner-default.png";
import Register from "./forms/Register";
import {Redirect, Route, Switch} from "react-router-dom";
import AccountVerification from "./forms/AccountVerification";
import AccountRecovery from "./forms/AccountRecovery";
import PasswordReset from "./forms/PasswordReset";

const Auth = () => {
    const [email, setEmail] = useState("");
    useEffect(() => {
        console.log(email);
    }, [email])

    return (
        <div className="page-container page-full">
            <div className="grid-container">
                <main className="auth-container">
                    <Switch>
                        <Route exact path="/auth/"><Redirect to="/auth/register"/></Route>
                        <Route exact path="/auth/register">
                            <Register email={email} setEmail={setEmail}/> </Route>
                        <Route exact path="/auth/account-verify">
                            <AccountVerification email={email} setEmail={setEmail}/> </Route>
                        <Route exact path="/auth/account-recover">
                            <AccountRecovery email={email} setEmail={setEmail}/> </Route>
                        <Route exact path="/auth/reset-password">
                            <PasswordReset email={email} setEmail={setEmail}/> </Route>
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