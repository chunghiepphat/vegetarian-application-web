import React, {useContext, useState} from "react";
import "./SearchBar.css";
import {UserContext} from "../../../context/UserContext";
import {useHistory} from "react-router-dom";
import {FaSistrix} from "react-icons/all";

const SearchBar = (props) => {
    const history = useHistory();
    const user = useContext(UserContext);
    // Handles form submission
    const [query, setQuery] = useState();
    const submitQuery = async (e) => {
        e.preventDefault();
        if (user && user.role === "admin") {
            history.push({
                pathname: "/console/search",
                search: `search=${query}`,
            })
        } else {
            history.push({
                pathname: "/search",
                search: `search=${query}`,
            })
        }
    }

    return (
        <form className="form-search" onSubmit={submitQuery}>
            <label>
                <FaSistrix/>
                <input aria-label="search" type="text"
                       value={query} onChange={e => setQuery(e.target.value)}
                       placeholder={props.placeholder} required/>
            </label>
        </form>
    )
}

export default SearchBar;