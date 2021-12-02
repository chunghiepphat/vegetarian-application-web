import React, {useEffect, useState} from "react";
import "./Auth.css";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./forms/Register";
import AccountVerification from "./forms/AccountVerification";
import AccountRecovery from "./forms/AccountRecovery";
import RecoveryStep2 from "./forms/recovery/RecoveryStep2";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [background, setBackground] = useState();
    const backgrounds = [
        "https://res.cloudinary.com/toanl33/image/upload/v1637988178/banner-background-1_merghi.png",
        "https://res.cloudinary.com/toanl33/image/upload/v1637988185/banner-background-2_edwvp2.png",
        "https://res.cloudinary.com/toanl33/image/upload/v1637988193/banner-background-3_rgdfem.png",
        "https://res.cloudinary.com/toanl33/image/upload/v1637988198/banner-background-4_ywmsyq.png",
    ];
    useEffect(() => {
        const min = Math.ceil(0);
        const max = Math.floor(backgrounds.length);
        setBackground(backgrounds[Math.floor(Math.random() * (max - min) + min)]);
    }, [])

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
                            <RecoveryStep2 email={email} setEmail={setEmail}/> </Route>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </div>
            <div className="page-background" style={{backgroundImage: `url(${background})`}}>
                <div className="page-overlay"/>
            </div>
        </div>
    )
}

export default Auth;