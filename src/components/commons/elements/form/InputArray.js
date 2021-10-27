import React from "react";
import "./InputArray.css";

const InputArray = (props) => {
    return (
        <div className="input-array scroll-container" style={props.style}>
            {props.children}
            <div className="flex-filler"/>
            <div className="flex-filler"/>
            <div className="flex-filler"/>
            <div className="flex-filler"/>
            <div className="flex-filler"/>
            <div className="flex-filler"/>
        </div>
    )
}

export default InputArray;