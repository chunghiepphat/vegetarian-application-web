import React, {useContext, useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";

const HistoryBlogs = () => {
    const user = useContext(UserContext);
    const api = `${apiBase}/blogs/getallbyuserID/${user.id}?page=1&limit=100`;
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
                {data &&
                <div className="panel">
                    {data.length > 0 ?
                        data.map(item => (
                            <Card className="card-full"
                                  key={item.blog_id}
                                  id={item.blog_id}
                                  type="blog"
                                  title={item.blog_title}
                                  thumbnail={item.blog_thumbnail}
                                  subtitle={item.blog_subtitle}
                                  userId={item.user_id}
                                  firstName={item.first_name}
                                  lastName={item.last_name}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>
                }
            </div>
        </section>
    )
}

export default HistoryBlogs;