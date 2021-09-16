import React from "react";
import "./About.css";
import {Link} from "react-router-dom";
import Navbar from "../../../components/commons/Navbar";

const About = (props) => {
    console.log(props.location);
    console.log(props.match);
    console.log(props.history);
    return (
        <main>
            <h1>About us</h1>
            <Navbar>
                <Link to={`${props.match.url}/auth`}>Sign in</Link>
            </Navbar>
        </main>
    )
}

export default About;