import React, {useContext, useEffect, useState} from "react";
import "./Home.css";
import "./Search.css";
import LocalizedStrings from "react-localization";
import {useLocation} from "react-router-dom";
import {apiUrl} from "../../helpers/Variables";
import {UserContext} from "../../context/UserContext";
import SearchFilters from "./search/SearchFilters";
import ResultTabs from "./search/ResultTabs";
import ResultList from "./search/ResultList";
import {SectionLoader} from "../commons/elements/loaders/Loader";
import {SectionEmp} from "../commons/elements/loaders/AlertEmpty";

const Search = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            messageEmpty: "There were no results matching your criteria.",
            messageInvalid: "It seems your search query was invalid.",
        },
        vi: {
            messageEmpty: "Không có kết quả nào phù hợp với tìm kiếm của bạn.",
            messageInvalid: "Có vẻ như từ khóa tìm kiếm của bạn không hợp lệ.",
        }
    });
    // Fetches category list from server
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategories = async () => {
        const api = `${apiUrl}/recipes/categories`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setCategoryList(result.listResult);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchCategories();
    }, [user]);
    // Handles fetching results
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiUrl}/home/find${location.search}`;
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
        fetchData(); // fetches results again everytime the query changes
    }, [location.search])

    return (
        <div className="page-container">
            <SearchFilters categoryList={categoryList} fetchData={fetchData}/>
            <div className="grid-container">
                <main style={{gridColumn: "span 4"}}>
                    {!isLoading ? <>
                        {data ? <>
                            {data.listRecipe.length > 0 || data.listVideo.length > 0 || data.listBlog.length > 0 ? <>
                                <ResultTabs data={data}/>
                                <ResultList data={data}/>
                            </> : <SectionEmp message={strings.messageEmpty}/>}
                        </> : <SectionEmp message={strings.messageInvalid}/>}
                    </> : <SectionLoader/>}
                </main>
            </div>
        </div>

    )
}

export default Search;