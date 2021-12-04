import React, {useContext, useEffect} from "react";
import {consoleDisplayStrings} from "../../../../resources/AdminDisplayStrings";
import {requestErrorStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {apiUrl} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import CategoryCard from "../../elements/CategoryCard";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";

const ListCategories = ({user, token, location, data, fetchData, isLoading, isError}) => {
    // Localizations
    consoleDisplayStrings.setLanguage(useContext(LocaleContext));
    requestErrorStrings.setLanguage(useContext(LocaleContext));

    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const handleEdit = async (e, categoryId, categoryName) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Update this category?");
        if (isConfirmed) {
            // Generates request body
            let body = JSON.stringify({
                "category_name": categoryName,
            });
            // Generates request
            let request = {
                method: 'PUT',
                headers: headers,
                body: body,
            };
            const api = `${apiUrl}/recipes/edit/category/${categoryId}`;
            try {
                const response = await fetch(api, request)
                if (response.ok) {
                    await fetchData();
                } else if (response.status >= 400 && response.status < 600) {
                    alert(requestErrorStrings.requestErrorStatus + response.status);
                }
            } catch (error) {
                alert(requestErrorStrings.requestErrorException + error);
            }
        }
    }
    const handleRemove = async (e, categoryId) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Remove this category?");
        if (isConfirmed) {
            // Generates request
            let request = {
                method: 'DELETE',
                headers: headers,
            };
            const api = `${apiUrl}/recipes/delete/category/${categoryId}`;
            try {
                const response = await fetch(api, request)
                if (response.ok) {
                    await fetchData();
                } else if (response.status >= 400 && response.status < 600) {
                    alert(consoleDisplayStrings.consoleCategoryDeleteError + response.status);
                }
            } catch (error) {
                alert(requestErrorStrings.requestErrorException + error);
            }
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchData();
    }, [user, location]);

    return (
        <Panel filler="category-card">
            {!isLoading ? <>
                {!isError ? <>
                    {data && data.length > 0 ? <>
                        {data.map((item) => (
                            <CategoryCard key={item.category_id}
                                          categoryId={item.category_id}
                                          categoryName={item.category_name}
                                          handleEdit={handleEdit} handleRemove={handleRemove}/>))}
                    </> : <PanelEmp/>}
                </> : <PanelErr reload={fetchData}/>}
            </> : <PanelLoader/>}
        </Panel>
    )
}

export default ListCategories;