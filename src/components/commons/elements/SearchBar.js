import React, {useState} from "react";
import "./SearchBar.css";
import {FaSistrix} from "react-icons/all";
import {useHistory} from "react-router-dom";

const SearchBar = (props) => {
    const [query, setQuery] = useState();
    const history = useHistory();

    const submitQuery = async (e) => {
        e.preventDefault();
        // const api = `${apiBase}/home/find?search=${query}`;
        history.push({
            pathname: "/search/recipes",
            search: `search=${query}`,
            state: {query: query},

        })
        // const fetchData = async (api) => {
        //     setIsError(false);
        //     setIsLoading(true);
        //     try {
        //         const response = await fetch(api)
        //         if (response.ok) {
        //             const result = await response.json();
        //             setData(result);
        //             setIsLoading(false);
        //         } else if (response.status >= 400 && response.status < 600) {
        //             setIsError(true);
        //             setIsLoading(false);
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         setIsError(true);
        //         setIsLoading(false);
        //     }
        // }
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