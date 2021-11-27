import React, {useContext, useEffect, useState} from "react";
import "./Home.css";
import "./Search.css";
import {searchDisplayStrings} from "../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";
import {UserContext} from "../../context/UserContext";
import {apiUrl} from "../../helpers/Variables";
import {useLocation} from "react-router-dom";
import SearchFilters from "./search/SearchFilters";
import SearchTabs from "./search/SearchTabs";
import SearchResults from "./search/SearchResults";
import {SectionLoader} from "../commons/elements/loaders/Loader";
import {SectionEmp} from "../commons/elements/loaders/AlertEmpty";


const Search = () => {
    const location = useLocation();
    let locale = useContext(LocaleContext);
    // Localizations
    searchDisplayStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    const user = useContext(UserContext);

    // Fetches recipe category list from server
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategories = async () => {
        const api = `${apiUrl}/recipes/categories?translate=${locale}`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setCategoryList(result.listResult);
            }
        } catch {
        }
    }
    useEffect(() => {
        fetchCategories();
    }, [user, locale]);

    // Fetches search results
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiUrl}/home/find${location.search}${user ? `&userID=${user.id}` : ``}`;
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                await setData(result);
                setIsLoading(false);
            } else setIsLoading(false);
        } catch (error) {
            setData(undefined);
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData(); // Fetches results again everytime the query changes
    }, [location.search])

    return (
        <div className="page-container">
            <SearchFilters categoryList={categoryList} fetchData={fetchData}/>
            <div className="grid-container">
                <main style={{gridColumn: "span 4"}}>
                    {!isLoading ? <>
                        {data ? <>
                            {data.listRecipe.length > 0 || data.listVideo.length > 0 || data.listBlog.length > 0 ? <>
                                <SearchTabs data={data}/>
                                <SearchResults data={data}/>
                            </> : <SectionEmp message={searchDisplayStrings.searchResultsEmpty}/>}
                        </> : <SectionEmp message={searchDisplayStrings.searchResultsInvalid}/>}
                    </> : <SectionLoader/>}
                </main>
            </div>
        </div>
    )
}

export default Search;