import React, {useEffect, useState} from "react";
import {Route, Switch, useLocation, useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import BlogContent from "./blog/BlogContent";
import BlogComments from "./blog/BlogComments";
import BlogHeader from "./blog/BlogHeader";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import BlogToolbar from "./blog/BlogToolbar";
import EditBlog from "../../user/edit/EditBlog";

const ViewRecipe = () => {
    let {id} = useParams();
    const location = useLocation();
    const [data, setData] = useState();

    const fetchData = async () => {
        const api = `${apiBase}/blogs/getblogby/${id}`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, [location]);

    return (
        <section>
            <Switch>
                <Route path={`/view/blog/:id/edit`}>
                    <EditBlog id={id} data={data}/>
                </Route>
                <Route>
                    {data ?
                        <div className="section-content">
                            <article>
                                <BlogHeader data={data}/>
                                <BlogToolbar id={id} data={data} reload={fetchData}/>
                                <BlogContent data={data}/>
                                <BlogComments data={data}/>
                            </article>
                        </div>
                        :
                        <SectionLoader/>
                    }
                </Route>
            </Switch>
        </section>

    )
}

export default ViewRecipe;