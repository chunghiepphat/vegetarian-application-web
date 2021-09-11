import React from "react";
import "./Nav.css";

class Nav extends React.Component {

    render() {
        return (
            <nav class="nav-bar">
                {this.props.children}
            </nav>
        )
    }
}

export default Nav;