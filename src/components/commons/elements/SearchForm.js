import React from "react";
import "./SearchForm.css";
import {FaSistrix} from "react-icons/all";
import {useHistory} from "react-router-dom";

const SearchForm = (props) => {
    const history = useHistory();

    const submitQuery = () => {
        history.push("/search")
    }

    return (
        <form className="form-search" onSubmit={submitQuery}>
            <FaSistrix/><input type="text" name="" placeholder={props.placeholder}/>
        </form>)
}

export default SearchForm;