import React, {useContext, useEffect, useState} from "react";
import './App.css';
import Header from "components/commons/elements/site/Header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Home from "./screens/home/Home";
import About from "./screens/commons/About";
import Footer from "./components/commons/elements/site/Footer";
import Modal from "./components/auth/Modal";
import Profile from "./screens/user/Profile";
import NotFound from "./screens/commons/NotFound";
import Browse from "./screens/home/Browse";
import View from "./screens/home/View";
import Post from "./screens/user/Post";
import Search from "./screens/home/Search";
import {UserContext} from "./context/UserContext";

export default function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userInfo")));
        console.log(user)
    }, [])
    // Scrolls back to top on render
    let location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    const background = location.state && location.state.background;

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Header/>
                <Switch location={background || location}>
                    {/*Home module*/}
                    <Route exact path="/" component={() => (<Redirect to='/home'/>)}/>
                    <Route exact path="/index" component={() => (<Redirect to='/home'/>)}/>
                    <Route exact path="/vegetarian-application-web" component={() => (<Redirect to='/home'/>)}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/view" component={View}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/browse" component={Browse}/>
                    {/*User module*/}
                    {user && <Route path={`/${user.id}`} component={Profile}/>}
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