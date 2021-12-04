import React, {useContext, useState} from "react";
import "./CategoryCard.css";
import {UserContext} from "../../../context/UserContext";
import {FaAngleRight, FaEdit} from "react-icons/fa";
import {FaCheck, ImCross} from "react-icons/all";

const CategoryCard = ({categoryId, categoryName, handleEdit, handleRemove}) => {
    const user = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [category, setCategory] = useState(categoryName);
    const enableEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }
    const disableEdit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }

    return (
        <div className="category-card">
            {isEditing ? <>
                <div className="card__details">
                    <form id="addCategory" onSubmit={e => handleEdit(e, categoryId, category)}>
                        <input type="text" placeholder="New category"
                               value={category}
                               onChange={e => setCategory(e.target.value)} required/>
                    </form>
                </div>
                <div className="card-buttons">
                    <button type="submit" form="addCategory"
                            className="card-category-add"><FaCheck/></button>
                    <button className="card-category-remove"
                            onClick={e => disableEdit(e)}><ImCross/></button>
                </div>
            </> : <>
                <div className="card__details">
                    {categoryName && <h1 className="card-category-name">
                        {categoryName}
                        {user && user.role !== "admin" && <FaAngleRight/>}
                    </h1>}
                </div>
                <div className="card-buttons">
                    <button className="card-category-edit" onClick={e => enableEdit(e)}>
                        <FaEdit/>
                    </button>
                    <button className="card-category-remove" onClick={e => handleRemove(e, categoryId)}>
                        <ImCross/>
                    </button>
                </div>
            </>}
        </div>
    )
}

export default CategoryCard;