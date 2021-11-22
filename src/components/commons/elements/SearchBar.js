import React, {useState} from "react";
import "./SearchBar.css";
import {useHistory} from "react-router-dom";
import {FaSistrix} from "react-icons/all";

const SearchBar = (props) => {
    const history = useHistory();
    // Handles form submission
    const [query, setQuery] = useState();
    const submitQuery = async (e) => {
        e.preventDefault();
        history.push({
            pathname: "/search",
            search: `search=${query}`,
        })
    }

    return (
        <form className="form-search" onSubmit={submitQuery}>
            <label>
                <FaSistrix/>
                <input aria-label="search" type="text"
                       value={query} onChange={e => setQuery(e.target.value)}
                       placeholder={props.placeholder}/>
            </label>
        </form>
    )
}

export default SearchBar;