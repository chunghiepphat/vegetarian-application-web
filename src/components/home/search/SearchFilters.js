import React, {useContext, useEffect, useState} from "react";
import {searchDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {useHistory, useLocation} from "react-router-dom";

// Custom useQuery hook
const useQueryString = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

const SearchFilters = ({categoryList}) => {
    const location = useLocation();
    const history = useHistory();

    // Localizations
    searchDisplayStrings.setLanguage(useContext(LocaleContext));

    // CSS styles
    const sliderWrapperStyles = {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
    }
    const sliderValueStyles = {
        width: "300px",
        whiteSpace: "nowrap",
    }

    // Search parameters
    const queryString = useQueryString();
    const [query, setQuery] = useState(queryString.get("search"));
    const [type, setType] = useState();
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState();
    const [prepTime, setPrepTime] = useState("10");
    const [sort, setSort] = useState("newest")
    useEffect(() => {
        setQuery(queryString.get("search"));
    }, [location.search])

    // Handles search button click
    const submitQuery = (e) => {
        e.preventDefault();
        let searchString = `search=${query}`;
        if (type) searchString = searchString + `&type=${type}`;
        if (type === "recipe") {
            if (category) searchString = searchString + `&category=${category}`;
            if (difficulty) searchString = searchString + `&difficulty=${difficulty}`;
            if (prepTime) searchString = searchString + `&prepare_time=${prepTime}`;
        }
        searchString = searchString + `&sort=${sort}`;
        history.push({
            pathname: "/search",
            search: searchString,
        })
    }

    return (
        <section className="search-form">
            <div className="search-criteria">
                <div className="search-filters">
                    <label>{searchDisplayStrings.searchFilterType}
                        <select value={type} onChange={e => setType(e.target.value)}>
                            <option value="">{searchDisplayStrings.searchFilterTypeAll}</option>
                            <option value="recipe">{searchDisplayStrings.searchFilterTypeRecipes}</option>
                            <option value="video">{searchDisplayStrings.searchFilterTypeVideos}</option>
                            <option value="blog">{searchDisplayStrings.searchFilterTypeBlogs}</option>
                        </select>
                    </label>
                    {type === "recipe" && <>
                        <label>{searchDisplayStrings.searchFilterCategory}
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                <option value="">{searchDisplayStrings.searchFilterCategoryAll}</option>
                                {categoryList && categoryList.length > 0 && categoryList.map(item => (
                                    <option value={item.category_id}>{item.category_name}</option>))}
                            </select>
                        </label>
                        <label>{searchDisplayStrings.searchFilterDifficulty}
                            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                <option value="">{searchDisplayStrings.searchFilterDifficultyAll}</option>
                                <option value={1}>{searchDisplayStrings.searchFilterDifficulty1}</option>
                                <option value={2}>{searchDisplayStrings.searchFilterDifficulty2}</option>
                                <option value={3}>{searchDisplayStrings.searchFilterDifficulty3}</option>
                                <option value={4}>{searchDisplayStrings.searchFilterDifficulty4}</option>
                                <option value={5}>{searchDisplayStrings.searchFilterDifficulty5}</option>
                            </select>
                        </label>
                        <label style={{flexBasis: "200px"}}>{searchDisplayStrings.searchFilterPrepTime}
                            <div style={sliderWrapperStyles}>
                                <input type="range" min={"5"} max={"120"} value={prepTime}
                                       onChange={e => setPrepTime(e.target.value)}/>
                                <span
                                    style={sliderValueStyles}>{prepTime} {searchDisplayStrings.searchFilterPrepTimeMinutes}</span>
                            </div>
                        </label>
                    </>}
                    <label style={{flexBasis: "200px"}}>{searchDisplayStrings.searchFilterSort}
                        <select value={sort} onChange={e => setSort(e.target.value)}>
                            <option value="newest">{searchDisplayStrings.searchFilterSortLatest}</option>
                            <option value="oldest">{searchDisplayStrings.searchFilterSortOldest}</option>
                            <option value="mostlike">{searchDisplayStrings.searchFilterSortPopularity}</option>
                            <option value="alphabet">{searchDisplayStrings.searchFilterSortName}</option>
                        </select>
                    </label>
                </div>
                <div className="search-query">
                    <form id="searchForm" onSubmit={submitQuery}>
                        <label>{searchDisplayStrings.searchFilterQuery}
                            <input type="text" placeholder={searchDisplayStrings.searchFilterQueryPlaceholder}
                                   value={query}
                                   onChange={e => setQuery(e.target.value)} required/>
                        </label>
                    </form>
                </div>
            </div>
            <button className="button-dark" form="searchForm">{searchDisplayStrings.searchFilterSearchButton}</button>
        </section>
    )
}

export default SearchFilters;