import React, {useContext, useEffect, useState} from "react";
import {apiPattern} from "../../../helpers/Helpers";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";

const HistoryBlogs = () => {
    const user = useContext(UserContext);
    const api = `${apiPattern}/blogs/getallbyuserID/${user.id}?page=1&limit=100`;
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
                                  lastName={blog.last_name}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>
            </div>
        </section>
    )
}

export default HistoryBlogs;