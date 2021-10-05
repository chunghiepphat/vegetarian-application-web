import React, {useEffect, useState} from "react";
import "./SearchBar.css";
import {FaSistrix} from "react-icons/all";
import {useHistory} from "react-router-dom";

const SearchBar = (props) => {
    const [query, setQuery] = useState("");
    const history = useHistory();

    const submitQuery = (e) => {
        e.preventDefault();
        history.push({
            pathname: "/search/recipes",
            search: `search=${query}&type=all`,
            state: {query: query},
        })
    }

    return (
        <form className="form-search" onSubmit={submitQuery}>
            <FaSistrix/>
            <input aria-label="search" type="text"
                   value={query} onChange={e => setQuery(e.target.value)}
                   placeholder={props.placeholder}/>
        </form>
    )
}

export default SearchBar;