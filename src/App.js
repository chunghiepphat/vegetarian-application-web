import React, {useEffect, useState} from "react";
import './App.css';
import Header from "components/commons/elements/site/Header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/commons/About";
import Footer from "./components/commons/elements/site/Footer";
import Modal from "./components/auth/Modal";
import Dashboard from "./components/user/Dashboard";
import NotFound from "./components/commons/NotFound";
import Browse from "./components/home/Browse";
import View from "./components/home/View";
import Post from "./components/user/Post";
import Search from "./components/home/Search";
import History from "./components/user/History";
import Update from "./components/user/Update";
import {apiBase} from "./helpers/Helpers";
import jwtDecode from "jwt-decode";
import {UserContext} from "./context/UserContext";
import Favorites from "./components/user/Favorites";
import Menu from "./components/user/Menu";
import Health from "./components/user/Health";
import Console from "./components/admin/Console";

export default function App() {
    let location = useLocation();
    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo !== null) {
            // Decode access token and add user info to UserContext
            // const decodedToken = jwtDecode(userInfo);
            const api = `${apiBase}/user/${userInfo.id}`
            const fetchData = async () => {
                const response = await fetch(api);
                const result = await response.json();
                setUser(result);
                if (result.id === 48) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
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

    console.log(user);
    console.log(isAdmin);
    const background = location.state && location.state.background;

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header/>
                <Switch location={background || location}>
                    {/*Public module*/}
                    <Route exact path="/"><Redirect to="/home"/></Route>
                    <Route exact path="/index"><Redirect to="/home"/></Route>
                    {!isAdmin && <Route exact path="/console"><Redirect to="/home"/></Route>}
                    {!isAdmin && <Route path="/home" component={Home}/>}
                    {!isAdmin && <Route path="/view" component={View}/>}
                    {!isAdmin && <Route path="/search" component={Search}/>}
                    {!isAdmin && <Route path="/browse" component={Browse}/>}
                    {/*User module*/}
                    {user && !isAdmin && <Route path="/profile" component={Dashboard}/>}
                    {user && !isAdmin && <Route path="/favorites" component={Favorites}/>}
                    {user && !isAdmin && <Route path="/history" component={History}/>}
                    {user && !isAdmin && <Route path="/update" component={Update}/>}
                    {user && !isAdmin && <Route path="/post" component={Post}/>}
                    {user && !isAdmin && <Route path="/menu" component={Menu}/>}
                    {user && !isAdmin && <Route path="/health" component={Health}/>}
                    {/*Admin module*/}
                    {user && isAdmin && <Route path="/console" component={Console}/>}
                    {user && isAdmin && <Route><Redirect to="/console"/></Route>}
                    {/*Miscellaneous*/}
                    {!isAdmin && <Route path="/about" component={About}/>}
                    {!isAdmin && <Route component={NotFound}/>}
                </Switch>
                {background && <Route path="/" children={<Modal/>}/>}
                {!isAdmin && <Footer/>}
            </div>
        </UserContext.Provider>
    );
}