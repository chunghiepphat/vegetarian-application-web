import React, {useEffect, useState} from "react";
import './App.css';
import Header from "components/commons/elements/site/Header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/commons/About";
import Footer from "./components/commons/elements/site/Footer";
import Modal from "./components/auth/AuthModal";
import Dashboard from "./components/user/Dashboard";
import NotFound from "./components/commons/NotFound";
import Browse from "./components/home/Browse";
import View from "./components/home/View";
import Post from "./components/user/Post";
import Search from "./components/home/Search";
import History from "./components/user/History";
import Profile from "./components/user/Profile";
import {apiBase} from "./helpers/Helpers";
import jwtDecode from "jwt-decode";
import {UserContext} from "./context/UserContext";
import Favorites from "./components/user/Favorites";
import Menu from "./components/user/Menu";
import Health from "./components/user/Health";
import Console from "./components/admin/Console";
import Drafts from "./components/user/Drafts";
import Auth from "./components/auth/Auth";

export default function App() {
    let location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchData = async () => {
        const api = `${apiBase}/user/${userInfo.id}`
        const response = await fetch(api);
        const result = await response.json();
        setUser(result);
        if (result.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        if (userInfo !== null) {
            // Decode access token and add user info to UserContext
            // const decodedToken = jwtDecode(userInfo);
            fetchData().catch(error => {
                console.error(error);
            });
        } else {
            // Clear UserContext if no access token is found
            setUser();
            setIsAdmin(false);
        }
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
                    {!isAdmin && <Route path="/home"><Home/></Route>}
                    {!isAdmin && <Route path="/view"><View/></Route>}
                    {!isAdmin && <Route path="/search"><Search/></Route>}
                    {!isAdmin && <Route path="/browse"><Browse/></Route>}
                    {/*Auth module*/}
                    {!user && <Route path="/auth"><Auth/></Route>}
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
                {background && <Route path="/" children={<Modal/>}/>}
                {!isAdmin
                && location.pathname !== "/auth/register"
                && location.pathname !== "/auth/verify"
                && location.pathname !== "/not-found"
                && <Footer/>}
            </div>
        </UserContext.Provider>
    );
}