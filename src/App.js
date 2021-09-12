import './App.css';
import Header from "components/commons/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./screens/commons/home/Home";
import About from "./screens/commons/commons/About";
import Footer from "./components/commons/Footer";
import NotFound from "./screens/commons/errors/NotFound";
import Modal from "./components/auth/Modal";
import React from "react";

function App(props) {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path="/" component={() => (<Redirect to='/home'/>)}/>
                <Route path="/index" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
                <Route>{NotFound}</Route>
            </Switch>
            <Route path={`${props.location.pathname}/auth`} component={Modal}/>
            <Route path="/" component={Footer}/>
        </div>
    );
}

export default App;
