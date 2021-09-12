import React from "react";
import "./Welcome.css";
import SearchForm from "../commons/SearchForm";
import Nav from "../commons/Nav";
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <section className="home-welcome">
            <h1>Find recipes, how-to videos and more</h1>
            <SearchForm placeholder="You name it, we'll find it."/>
            <Nav>
                <div>
                    <Link to="/recipes/main-courses">Main courses</Link>
                    <Link to="/recipes/soups">Soups</Link>
                    <Link to="/recipes/snacks">Snacks</Link>
                    <Link to="/recipes/desserts">Desserts</Link>
                </div>
                <div>
                    <Link to="/search">Advanced search</Link>
                </div>
            </Nav>
        </section>
    )
}

export default Welcome;