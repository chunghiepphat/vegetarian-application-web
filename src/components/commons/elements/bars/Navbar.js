import React from "react";
import "./Bar.css";

const Navbar = (props) => {
    return (
        <nav className="navbar">
            {props.children}
        </nav>
    )
}

export default Navbar;