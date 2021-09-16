import React from "react";
import "./Notification.css";

const Dialog = (props) => {
    return (
        <div className="dialog-popup">
            <h1 className="dialog-title">
                {props.title}
            </h1>
            <p className="dialog-message">
                {props.message}
            </p>
        </div>
    )
}
export default Dialog;