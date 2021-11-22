import React, {useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {useHistory, useLocation} from "react-router-dom";

const useQueryString = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

const SearchFilters = ({categoryList}) => {
    const location = useLocation();
    const history = useHistory();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            labelType: "Article type",
            typeAll: "All",
            typeRecipes: "Recipes",
            typeVideos: "Videos",
            typeBlogs: "Blogs",
            labelCategory: "Category",
            categoryAll: "All categories",
            labelDifficulty: "Difficulty",
            difficultyAll: "All",
            difficulty1: "Beginner",
            difficulty2: "College student",
            difficulty3: "Home cook",
            difficulty4: "Chef",
            difficulty5: "Gordon Ramsay",
            labelPrepTime: "Preparation time",
            prepTimeMinutes: "minute(s) or less",
            labelSortBy: "Sort by",
            labelSearch: "Search query",
            placeholderSearch: "Search content by article title or author's name",
            buttonSearch: "Search",
        },
        vi: {
            labelType: "Loại nội dung",
            typeAll: "Toàn bộ",
            typeRecipes: "Công thức",
            typeVideos: "Video hướng dẫn",
            typeBlogs: "Bài viết",
            labelCategory: "Loại công thức",
            categoryAll: "Tất cả công thức",
            labelDifficulty: "Độ khó",
            difficultyAll: "Tất cả",
            difficulty1: "Người bắt đầu",
            difficulty2: "Sinh viên",
            difficulty3: "Nội trợ",
            difficulty4: "Đầu bếp",
            difficulty5: "Gordon Ramsay",
            labelPrepTime: "Thời gian chế biến",
            prepTimeMinutes: "phút trở xuống",
            labelSortBy: "Sắp xếp theo",
            labelSearch: "Từ khóa tìm kiếm",
            placeholderSearch: "Tìm kiếm nội dung với tên bài viết hoặc tác giả",
            buttonSearch: "Tìm kiếm",
        }
    });
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
    // Search params
    const queryString = useQueryString();
    const [query, setQuery] = useState(queryString.get("search"));
    const [type, setType] = useState();
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState();
    const [prepTime, setPrepTime] = useState("10");
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
        history.push({
            pathname: "/search",
            search: searchString,
        })
    }


    return (
        <section className="search-form">
            <div className="search-criteria">
                <div className="search-filters">
                    <label>{strings.labelType}
                        <select value={type} onChange={e => setType(e.target.value)}>
                            <option value="">{strings.typeAll}</option>
                            <option value="recipe">{strings.typeRecipes}</option>
                            <option value="video">{strings.typeVideos}</option>
                            <option value="blog">{strings.typeBlogs}</option>
                        </select>
                    </label>
                    {type === "recipe" && <>
                        <label>{strings.labelCategory}
                            <select value={category} onChange={e => setCategory(e.target.value)}>
                                <option value="">{strings.categoryAll}</option>
                                {categoryList && categoryList.length > 0 && categoryList.map(item => (
                                    <option value={item.category_id}>{item.category_name}</option>))}
                            </select>
                        </label>
                        <label>{strings.labelDifficulty}
                            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                <option value="">{strings.difficultyAll}</option>
                                <option value={1}>{strings.difficulty1}</option>
                                <option value={2}>{strings.difficulty2}</option>
                                <option value={3}>{strings.difficulty3}</option>
                                <option value={4}>{strings.difficulty4}</option>
                                <option value={5}>{strings.difficulty5}</option>
                            </select>
                        </label>
                        <label style={{flexBasis: "200px"}}>{strings.labelPrepTime}
                            <div style={sliderWrapperStyles}>
                                <input type="range" min={"5"} max={"120"} value={prepTime}
                                       onChange={e => setPrepTime(e.target.value)}/>
                                <span style={sliderValueStyles}>{prepTime} {strings.prepTimeMinutes}</span>
                            </div>
                        </label>
                    </>}
                    <label style={{flexBasis: "200px"}}>{strings.labelSortBy}
                        <select>
                            <option>Mày đã làm sort đâu em</option>
                        </select>
                    </label>
                </div>
                <div className="search-query">
                    <form onSubmit={submitQuery}>
                        <label>{strings.labelSearch}
                            <input type="text" placeholder={strings.placeholderSearch} value={query}
                                   onChange={e => setQuery(e.target.value)} required/>
                        </label>
                    </form>
                </div>
            </div>
            <button className="button-dark" onClick={e => submitQuery(e)}>{strings.buttonSearch}</button>
        </section>
    )
}

export default SearchFilters;