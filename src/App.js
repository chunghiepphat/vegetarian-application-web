import React, {useEffect} from "react";
import './App.css';
import Header from "components/commons/site/Header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Home from "./screens/home/Home";
import About from "./screens/commons/About";
import Footer from "./components/commons/site/Footer";
import Modal from "./components/auth/Modal";
import Profile from "./screens/user/Profile";
import NotFound from "./screens/commons/NotFound";
import Browse from "./screens/home/Browse";
import View from "./screens/home/View";
import Post from "./screens/user/Post";
import Search from "./screens/home/Search";

export default function App() {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    // Scrolls back to top on render
    let location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const background = location.state && location.state.background;

    return (
        <div className="App">
            <Header/>
            <Switch location={background || location}>
                {/*Home module*/}
                <Route exact path="/" component={() => (<Redirect to='/home'/>)}/>
                <Route exact path="/index" component={() => (<Redirect to='/home'/>)}/>
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
    );
}