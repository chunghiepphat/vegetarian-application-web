import React, {useState} from "react";
import {FaCheck, GrAdd, ImCross,} from "react-icons/all";
import {apiBase} from "../../../../helpers/Variables";

const AddCategories = ({token, reload}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const containerStyles = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "20px 0",
    }
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchData = async () => {
        // Generates request body
        let body = JSON.stringify({
            "category_name": categoryName,
            "category_thumbnail": "",
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        const api = `${apiBase}/recipes/create/category`;
        try {
            const response = await fetch(api, request)
            if (response.ok) {
                setIsEditing(false);
                reload();
            } else if (response.status >= 400 && response.status < 600) {
                alert("Error: " + response.status);
            }
        } catch (error) {
            console.error(error);
            alert("Unexpected error: " + error);
        }
    }
    const enableEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }
    const disableEdit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        fetchData();
    }
    return (
        <div style={containerStyles}>
            <div className="category-card" style={{width: "auto", height: "60px"}}>
                {isEditing ? <>
                    <form id="addCategory" onSubmit={handleEdit}>
                        <input type="text" placeholder="New category"
                               onChange={e => setCategoryName(e.target.value)} required/>
                    </form>
                    <div className="card-buttons">
                        <button type="submit" form="addCategory"
                                className="card-category-add"><FaCheck/></button>
                        <button className="card-category-remove"
                                onClick={e => disableEdit(e)}><ImCross/></button>
                    </div>
                </> : <button className="card-category-add" onClick={e => enableEdit(e)}><GrAdd/></button>}
            </div>
        </div>
    )
}

export default AddCategories;