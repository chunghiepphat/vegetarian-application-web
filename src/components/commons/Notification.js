import React from "react";
import "./Notification.css";

const Dialog = () => {
    return (
        <div className="dialog-popup">
            <h1 className="dialog-title">
                {this.props.title}
            </h1>
            <p className="dialog-message">
                {this.props.message}
            </p>
        </div>
    )
}
export default Dialog;