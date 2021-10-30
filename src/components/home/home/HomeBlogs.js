import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Card from "../../commons/elements/containers/Card";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const HomeBlogs = () => {
    const api = `${apiBase}/blogs/get10blogs`;
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
                {data &&
                <Panel>
                    {data.length > 0 ? data.map(item => (
                            <Card className="card-full"
                                  key={item.blog_id}
                                  id={item.blog_id}
                                  type="blog"
                                  title={item.blog_title}
                                  subtitle={item.blog_subtitle}
                                  thumbnail={item.blog_thumbnail}
                                  userId={item.user_id}
                                  firstName={item.first_name}
                                  lastName={item.last_name}
                                  time={item.time}
                                  totalLikes={item.totalLike}/>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>}
            </div>
        </section>
    )
}

export default HomeBlogs;