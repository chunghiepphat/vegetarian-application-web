import React from "react";
import "./Dialog.css";

class Dialog extends React.Component {
    render() {
        return (
            <div class="dialog-popup">
                <h1 class="dialog-title">
                    {this.props.title}
                </h1>
                <p class="dialog-message">
                    {this.props.message}
                </p>
            </div>
        )
    }
}