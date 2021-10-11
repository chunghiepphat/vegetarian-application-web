import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Card from "../../commons/elements/containers/Card";
import {apiPattern} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const HomeBlogs = () => {
    const api = `${apiPattern}/blogs/get10blogs`;
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
        console.log(data)
    }, [api]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Newest stories around</h1>
                <Link to="/browse/blogs"><FaAngleRight/>See more</Link>
            </header>
            <div className="section-content">
                <Panel>
                    {data.length > 0 ? data.map(blog => (
                            <Card className="card-full"
                                  key={blog.blog_id}
                                  id={blog.blog_id}
                                  type="blog"
                                  title={blog.blog_title}
                                  subtitle={blog.blog_subtitle}
                                  thumbnail={blog.blog_thumbnail}
                                  firstName={blog.first_name}
                                  lastName={blog.last_name}
                                  time={blog.time}
                                  totalLike={blog.totalLike}/>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>
            </div>
        </section>
    )
}

export default HomeBlogs;