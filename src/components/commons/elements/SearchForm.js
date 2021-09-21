import React from "react";
import "./SearchForm.css";
import {FaSistrix} from "react-icons/all";

const SearchForm = (props) => {
    return (
        <form className="form-search">
            <FaSistrix/><input type="text" name="" placeholder={props.placeholder}/>
        </form>)
}

export default SearchForm;