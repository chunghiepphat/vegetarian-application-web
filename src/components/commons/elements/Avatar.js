import React, {useEffect, useState} from "react";
import "./Avatar.css";
import placeholderAvatar from "../../../assets/user-image-default.png";
import jwtDecode from "jwt-decode";
import {apiPattern} from "../../../helpers/Helpers";

const Avatar = ({className, data}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if (data !== undefined) {
            const api = `${apiPattern}/user/${data.user_id}`
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
            <img src={placeholderAvatar} alt=""/>
        </picture>
    )
}

export default Avatar;