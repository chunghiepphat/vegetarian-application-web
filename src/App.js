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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [user, setUser] = useState(userInfo);
    const [isAdmin, setIsAdmin] = useState(false);
    // Refresh authenticated user's data and save it to local storage
    const fetchData = async () => {
        const api = `${apiBase}/user/${userInfo.id}`
        const response = await fetch(api);
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem("userInfo", JSON.stringify(result));
            // Check the user's role
            if (result.role === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }
    useEffect(() => {
        // console.log(location)
        // If there is an active user (userInfo in local storage)
        if (userInfo !== null) {
            // Fetch the user's data
            fetchData().catch(error => {
                console.error(error);
            });
            setUser(userInfo);
        } else {
            // Clear UserContext and reset roles if no access token is found
            setUser();
            setIsAdmin(false);
        }
        // Reset scroll upon page change
        window.scrollTo(0, 0)
    }, [location]);
    const background = location.state && location.state.background;

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header/>
                <Switch location={background || location}>
                    {/*Public module*/}
                    {/*<Route exact path="/"><Redirect to="/home"/></Route>*/}
                    <Route exact path="/"><Redirect to="/home"/></Route>
                    <Route exact path="/index"><Redirect to="/home"/></Route>
                    {!isAdmin && <Route path="/console"><Redirect to="/home"/></Route>}
                    {!isAdmin && <Route exact path="/home"><Home/></Route>}
                    {!isAdmin && <Route path="/view"><View/></Route>}
                    {!isAdmin && <Route path="/search"><Search/></Route>}
                    {!isAdmin && <Route path="/browse"><Browse/></Route>}
                    {/*Auth module*/}
                    {!user ? <Route path="/auth"><Auth/></Route>
                        : <Route path="/auth"><Redirect to="/home"/></Route>}
                    {/*User module*/}
                    {user && !isAdmin && <Route path="/profile"><Dashboard/></Route>}
                    {user && !isAdmin && <Route path="/update"><Profile/></Route>}
                    {user && !isAdmin && <Route path="/health"><Health/></Route>}
                    {user && !isAdmin && <Route path="/drafts"><Drafts/></Route>}
                    {user && !isAdmin && <Route path="/history"><History/></Route>}
                    {user && !isAdmin && <Route path="/favorites"><Favorites/></Route>}
                    {user && !isAdmin && <Route path="/post"><Post/></Route>}
                    {user && !isAdmin && <Route path="/menu"><Menu/></Route>}
                    {/*Admin module*/}
                    {user && isAdmin && <Route path="/console"><Console/></Route>}
                    {user && isAdmin && <Route><Redirect to="/console"/></Route>}
                    {/*Miscellaneous*/}
                    {!isAdmin && <Route path="/about"><About/></Route>}
                    {!isAdmin && <Route path="/not-found"><NotFound/></Route>}
                    {!isAdmin && <Redirect to="/not-found"/>}
                </Switch>
                {background && !user && <Route path="/" children={<AuthModal background={background}/>}/>}
                {!isAdmin
                && location.pathname !== "/auth/register"
                && location.pathname !== "/auth/account-verify"
                && location.pathname !== "/auth/account-recover"
                && location.pathname !== "/not-found"
                && <Footer/>}
            </div>
        </UserContext.Provider>
    );
}