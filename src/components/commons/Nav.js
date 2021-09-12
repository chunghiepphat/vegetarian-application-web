import React from "react";
import "./Nav.css";

const Nav = () => {
    return (
        <nav className="nav-bar">
            {this.props.children}
        </nav>
    )
}

export default Nav;