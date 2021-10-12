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

export default function App() {
    let location = useLocation();
    const [user, setUser] = useState();
    const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        if (accessToken !== null) {
            const decodedToken = jwtDecode(accessToken);
            const api = `${apiBase}/user/${decodedToken.id}`
            const fetchData = async () => {
                const response = await fetch(api);
                const result = await response.json();
                setUser(result);
            }
            fetchData().catch(error => {
                console.error(error);
            });
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
                    <Route exact path="/"><Redirect to='/home'/></Route>
                    <Route exact path="/index"><Redirect to='/home'/></Route>
                    <Route exact path="/vegetarian-application-web"><Redirect to='/home'/></Route>
                    <Route path="/home" component={Home}/>
                    <Route path="/view" component={View}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/browse" component={Browse}/>
                    {/*User module*/}
                    {user && <Route path="/profile" component={Dashboard}/>}
                    {user && <Route path="/favorites" component={Favorites}/>}
                    {user && <Route path="/history" component={History}/>}
                    {user && <Route path="/update" component={Update}/>}
                    {user && <Route path="/post" component={Post}/>}
                    {/*Miscellaneous*/}
                    <Route path="/about" component={About}/>
                    <Route component={NotFound}/>
                </Switch>
                {background && <Route path="/" children={<Modal/>}/>}
                <Footer/>
            </div>
        </UserContext.Provider>
    );
}