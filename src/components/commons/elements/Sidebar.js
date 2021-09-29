import React from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
    return (
        <aside>
            {props.children}
        </aside>
    )
}

export default Sidebar;