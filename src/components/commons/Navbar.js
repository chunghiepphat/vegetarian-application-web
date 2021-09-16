import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
    return (
        <nav className="nav-bar">
            {props.children}
        </nav>
    )
}

export default Navbar;