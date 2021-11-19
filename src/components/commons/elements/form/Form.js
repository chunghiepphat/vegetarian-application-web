import React from "react";
import "./Form.css";

const Form = (props) => {
    return (
        <form id={props.id} style={props.style}
              className={`form-container ${props.className}`}
              onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

export default Form;