import React, {useEffect, useState} from "react";
import "./Comment.css";
import placeholderAvatar from "../../../assets/user-image-default.png";
import {apiPattern} from "../../../helpers/Helpers";
import Avatar from "./Avatar";

const Comment = ({userId, content}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const api = `${apiPattern}/user/${userId}`
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setUser(result);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [userId]);
    return (
        <div className="comment">
            <div className="comment-author">
                <Avatar className={"comment-avatar"}/>
                <h1 className="comment-user">
                    {/*{user.first_name}*/}
                    John Doe
                </h1>
            </div>
            <div className="comment-content">Lorem ipsum dolor sit amet.</div>
        </div>
    )
}

export default Comment;