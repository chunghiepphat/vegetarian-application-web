import React, {useEffect, useState} from "react";
import {apiBase} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";
import UserCard from "../../elements/UserCard";
import Avatar from "../../../commons/elements/Avatar";

const ListUsers = () => {
    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiBase}/user/viewall?page=1&limit=200`;
        const response = await fetch(api, request);
        const result = await response.json();
        setData(result.listUser);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <>

            {data &&
            <Panel>
                {/*Iterates over the result JSON and renders a matching amount of card items*/}
                {data.length > 0 ?
                    data.map(item => (
                        <UserCard key={item.id}
                                  id={item.id}
                                  isActive={item.is_active}
                                  avatar={item.profile_image}
                                  firstName={item.first_name}
                                  lastName={item.last_name}
                                  email={item.email}
                                  country={item.country}
                                  role={item.role}/>
                    ))
                    :
                    <SectionLoader/>
                }
            </Panel>}
        </>
    )
}

export default ListUsers;