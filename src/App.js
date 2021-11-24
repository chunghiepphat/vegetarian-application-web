import React, {useEffect, useState} from "react";
// Stylesheets
import './App.css';
// Dependencies
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi';
// Variables
import {UserContext} from "./context/UserContext";
import {apiUrl} from "./helpers/Variables";
// Global site components
import Header from "components/commons/elements/site/Header";
import Footer from "./components/commons/elements/site/Footer";
// Authentication components
import Auth from "./components/auth/Auth";
import AuthModal from "./components/auth/AuthModal";
// Public components
import Home from "./components/home/Home";
import About from "./components/commons/About";
import Browse from "./components/home/Browse";
import Search from "./components/home/Search";
import View from "./components/home/View";
import NotFound from "./components/commons/NotFound";
// User-exclusive components
import Dashboard from "./components/user/Dashboard";
import Profile from "./components/user/Profile";
import Health from "./components/user/Health";
import Menu from "./components/user/Menu";
import Post from "./components/user/Post";
import Drafts from "./components/user/Drafts";
import History from "./components/user/History";
import Favorites from "./components/user/Favorites";
// Admin-exclusive components
import Console from "./components/admin/Console";

export default function App() {
    let location = useLocation();
    // Sets datetime locales
    let locale = window.navigator.language;
    moment.locale(locale);
    // Authenticated user data
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [user, setUser] = useState(userInfo);
    // Refreshes authenticated user's data and save it to local storage
    const fetchData = async () => {
        const api = `${apiUrl}/user/${userInfo.id}`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setUser(result);
                localStorage.setItem("userInfo", JSON.stringify(result));
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        // 1. If userInfo exists in local storage, that means user is authenticated
        // 2. Executes fetch to get user info, then updates UserContext
        if (userInfo !== null) fetchData();
        // Otherwise, clears UserContext
        else setUser(undefined);
        // Resets scroll back to top on page change
        window.scrollTo(0, 0)
    }, [location]);
    // Handles modal background states
    const background = location.state && location.state.background;

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header/>
                {/*{!isLoading && <>*/}
                <Switch location={background || location}>
                    {/*Auth module*/}
                    {!user ? <Route path="/auth"><Auth/></Route>
                        : <Route path="/auth"><Redirect to="/home"/></Route>}
                    {/*User module*/}
                    {user && user.role !== "admin" && <Route path="/profile"><Dashboard/></Route>}
                    {user && user.role !== "admin" && <Route path="/update"><Profile reload={fetchData}/></Route>}
                    {user && user.role !== "admin" && <Route path="/health"><Health reload={fetchData}/></Route>}
                    {user && user.role !== "admin" && <Route path="/drafts"><Drafts/></Route>}
                    {user && user.role !== "admin" && <Route path="/history"><History/></Route>}
                    {user && user.role !== "admin" && <Route path="/favorites"><Favorites/></Route>}
                    {user && user.role !== "admin" && <Route path="/post"><Post/></Route>}
                    {user && user.role !== "admin" && <Route path="/menu"><Menu/></Route>}
                    {/*Admin module*/}
                    {user && user.role === "admin" &&
                    <Route path="/console"><Console/></Route>}
                    {user && user.role === "admin" &&
                    <Route><Redirect to="/console"/></Route>}
                    {/*Public module*/}
                    <Route exact path="/"><Redirect to="/home"/></Route>
                    <Route exact path="/index"><Redirect to="/home"/></Route>
                    <Route path="/console"><Redirect to="/home"/></Route>
                    <Route exact path="/home"><Home/></Route>
                    <Route path="/view"><View/></Route>
                    <Route path="/search"><Search/></Route>
                    <Route path="/browse"><Browse/></Route>
                    <Route path="/about"><About/></Route>
                    <Route path="/not-found"><NotFound/></Route>
                    <Redirect to="/not-found"/>
                </Switch>
                {background && !user && <Route path="/" children={<AuthModal background={background}/>}/>}
                {user && user.role === "admin" ? "" : <>
                    {location.pathname !== "/auth/register"
                    && location.pathname !== "/auth/account-verify"
                    && location.pathname !== "/auth/account-recover"
                    && location.pathname !== "/not-found"
                    && <Footer/>}
                </>}
            </div>
        </UserContext.Provider>
    );
}