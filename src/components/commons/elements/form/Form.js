import React from "react";
import "./Form.css";

const Form = (props) => {
    return (
        <form className="form-container" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

export default Form;