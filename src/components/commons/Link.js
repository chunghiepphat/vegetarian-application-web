import React from "react";
import "./Link.css";

const Link = props => {
    return (
        <a class="nav-link" href={props.url} onClick={props.click}> {props.children}</a>
    )
}
export default Link;