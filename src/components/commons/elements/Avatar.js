import React, {useEffect, useState} from "react";
import "./Avatar.css";
import placeholderAvatar from "../../../assets/user-image-default.png";
import {apiUrl} from "../../../helpers/Variables";

const Avatar = ({className, data, userImage}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if (data !== undefined) {
            const api = `${apiUrl}/user/${data.user_id}`
            const fetchData = async () => {
                const response = await fetch(api);
                const result = await response.json();
                setUser(result);
            }
            fetchData().catch(error => {
                console.error(error);
            });
        }
    }, [data]);

    return (
        <picture className={`avatar ${className}`}>
            {user &&
            <source srcSet={user.profile_image}/>}
            {userImage &&
            <source srcSet={userImage}/>}
            <img src={placeholderAvatar} alt=""/>
        </picture>
    )
}

export default Avatar;