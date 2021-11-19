import React, {useEffect, useState} from "react";
import './App.css';
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {apiBase} from "./helpers/Variables";
import {UserContext} from "./context/UserContext";
import Auth from "./components/auth/Auth";
import AuthModal from "./components/auth/AuthModal";
import Header from "components/commons/elements/site/Header";
import Footer from "./components/commons/elements/site/Footer";
import Home from "./components/home/Home";
import View from "./components/home/View";
import Browse from "./components/home/Browse";
import Search from "./components/home/Search";
import About from "./components/commons/About";
import NotFound from "./components/commons/NotFound";
import Dashboard from "./components/user/Dashboard";
import Post from "./components/user/Post";
import Menu from "./components/user/Menu";
import Profile from "./components/user/Profile";
import Health from "./components/user/Health";
import Drafts from "./components/user/Drafts";
import History from "./components/user/History";
import Favorites from "./components/user/Favorites";
import Console from "./components/admin/Console";

export default function App() {
    let location = useLocation();
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [user, setUser] = useState(userInfo);
    const [isAdmin, setIsAdmin] = useState(false);
    // Refresh authenticated user's data and save it to local storage
    const fetchData = async () => {
        console.log(user)
        const api = `${apiBase}/user/${userInfo.id}`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setUser(result);
                localStorage.setItem("userInfo", JSON.stringify(result));
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (userInfo !== null) {
            fetchData();
        } else setUser(undefined);
        window.scrollTo(0, 0)
    }, [location]);
    const background = location.state && location.state.background;

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header/>
                {/*{!isLoading && <>*/}
                <Switch location={background || location}>
                    {/*Public module*/}
                    {/*<Route exact path="/"><Redirect to="/home"/></Route>*/}

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
                    {/*Miscellaneous*/}
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
                {location.pathname !== "/console"
                && location.pathname !== "/auth/register"
                && location.pathname !== "/auth/account-verify"
                && location.pathname !== "/auth/account-recover"
                && location.pathname !== "/not-found"
                && <Footer/>}
                {/*</>}*/}
            </div>
        </UserContext.Provider>
    );
}