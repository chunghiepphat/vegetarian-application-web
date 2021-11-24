import React, {useContext, useState} from "react";
import {useLocation} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import AddCategories from "./categories/AddCategories";
import ListCategories from "./categories/ListCategories";

const ManageCategories = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        const api = `${apiUrl}/recipes/categories`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setIsLoading(false);
        }
    }
    return (
        <section>
            <header className="console-header">
                <h1>Manage available recipe categories</h1>
            </header>
            <div className="console-content">
                <AddCategories user={user} token={token} location={location} reload={fetchData}/>
                <ListCategories user={user} token={token} location={location}
                                data={data} fetchData={fetchData}
                                isLoading={isLoading} isError={isError}/>
            </div>
        </section>
    )
}

export default ManageCategories;