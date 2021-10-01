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
                    <article>
                        <section className="article-title">
                            <h1>{data.blog_title}</h1>
                            <p><i>{data.first_name} {data.last_name} - {data.time}</i></p>
                            <p>{data.blog_subtitle}</p>
                        </section>
                        <section className="article-content">
                            <div dangerouslySetInnerHTML={{__html: data.blog_content}}/>
                        </section>
                    </article>
                </div>
            </section>
            }
        </main>

    )
}

export default ViewRecipe;