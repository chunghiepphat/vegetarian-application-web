import React from "react";
import "./InputGroup.css";

const InputGroup = (props) => {
    return (
        <div className="input-group" style={props.style}>
            {props.children}
        </div>
    )
}

export default InputGroup;