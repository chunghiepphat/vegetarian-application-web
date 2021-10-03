import React from "react";
import "./Bar.css";

const Toolbar = (props) => {
    return (
        <div className="toolbar">
            {props.children}
        </div>
    )
}

export default Toolbar;