import React from "react";
import "./Home.css";
import SearchResult from "../../components/home/search/SearchResult";
import SearchSidebar from "../../components/home/SearchSidebar";

const Search = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <SearchResult/>
                {/*Right sidebar*/}
                <SearchSidebar/>
            </div>
        </div>

    )
}

export default Search;