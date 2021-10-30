import React, {useEffect, useState} from "react";
import {apiBase} from "../../../../helpers/Helpers";
import Card from "../../../commons/elements/containers/Card";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";

const UserBlogs = ({userId}) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const api = `${apiBase}/blogs/getallbyuserIDdifferent/${userId}?page=1&limit=100`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result.listResult);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section>
            <div className="section-content">
                <h1>Blogs</h1>
                <i>Blogs and stories shared by this user are shown here.</i>
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

export default UserBlogs;