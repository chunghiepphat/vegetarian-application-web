import React from "react";
import "./About.css";
import {Link} from "react-router-dom";
import Nav from "../../../components/commons/Nav";

const About = (props) => {
    console.log(props.location);
    console.log(props.match);
    console.log(props.history);
    return (
        <main>
            <h1>About us</h1>
            <Nav>
                <Link to={`${props.match.url}/auth`}>Sign in</Link>
            </Nav>
        </main>
    )
}

export default About;