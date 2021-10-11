import React, {useEffect, useState} from "react";
import Card from "../../commons/elements/containers/Card";
import {apiPattern} from "../../../helpers/Helpers";
import {SectionLoader} from "../../commons/elements/loaders/Loader";

const BrowseBlogs = () => {
    const api = `${apiPattern}/blogs/getall?page=1&limit=100`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    return (
        <section>
            <div className="section-content">
                <h1>Blogs</h1>
                <i>Stories, thoughts, discussions and more.</i>
                <div className="panel">
                    {data.length > 0 ?
                        data.map(blog => (
                            <Card className="card-full"
                                  key={blog.blog_id}
                                  id={blog.blog_id}
                                  type="blog"
                                  title={blog.blog_title}
                                  thumbnail={blog.blog_thumbnail}
                                  subtitle={blog.blog_subtitle}
                                  firstName={blog.first_name}
                                  lastName={blog.last_name}
                                  time={blog.time}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>
            </div>
        </section>
    )
}

export default BrowseBlogs;