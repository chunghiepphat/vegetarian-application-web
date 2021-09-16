import './App.css';
import Header from "components/commons/Header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Home from "./screens/commons/home/Home";
import About from "./screens/commons/home/About";
import Footer from "./components/commons/Footer";
import Modal from "./components/auth/Modal";
import React from "react";
import Profile from "./screens/commons/user/Profile";
import Recipes from "./screens/commons/home/Recipes";

export default function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div className="App">
            <Header/>
            <Switch location={background || location}>
                <Route exact path="/" component={() => (<Redirect to='/home'/>)}/>
                <Route path="/index" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/recipes" component={Recipes}/>
                <Route path="/about" component={About}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
            {background && <Route path="/" children={<Modal/>}/>}
            <Route path="/" component={Footer}/>
        </div>
    );
}
