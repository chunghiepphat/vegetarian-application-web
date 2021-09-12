import React from "react";
import "./Header.css";
import Brand from "./Brand";
import SearchForm from "./SearchForm";
import Nav from "./Nav";
import {Link, withRouter} from "react-router-dom";

const Header = (props) => {
    console.log(props.location);
    console.log(props.match);
    console.log(props.history);
    return (
        <header className="site-header">
            <div>
                <Brand/>
                <Nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About us</Link>
                </Nav>
            </div>
            <SearchForm placeholder="What would you have for dinner?"/>
            <Nav>
                <Link to={`${props.location.pathname}/auth`}>Sign in</Link>
            </Nav>
        </header>
    );
}

export default withRouter(Header);