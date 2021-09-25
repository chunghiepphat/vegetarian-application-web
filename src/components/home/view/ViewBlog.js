import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const ViewRecipe = () => {
    let {id} = useParams();
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/blogs/getblogby/${id}`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, [api]);

    return (
        <main>
            {data &&
            <section>
                <div className="section-content">
                    <h1>{data.blog_title}</h1>
                    <i>{data.first_name} {data.last_name}</i>
                    <p>{data.blog_content}</p>

                </div>
            </section>
            }
        </main>

    )
}

export default ViewRecipe;