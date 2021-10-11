import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiPattern} from "../../../helpers/Helpers";
import BlogContent from "./blog/BlogContent";
import BlogComments from "./blog/BlogComments";
import BlogHeader from "./blog/BlogHeader";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import BlogToolbar from "./blog/BlogToolbar";

const ViewRecipe = () => {
    let {id} = useParams();
    const api = `${apiPattern}/blogs/getblogby/${id}`;
    const [data, setData] = useState();

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section>
            {data ?
                <div className="section-content">
                    <article>
                        <BlogHeader data={data}/>
                        <BlogToolbar data={data}/>
                        <BlogContent data={data}/>
                        <BlogComments data={data}/>
                    </article>
                </div>
                :
                <SectionLoader/>
            }
        </section>

    )
}

export default ViewRecipe;