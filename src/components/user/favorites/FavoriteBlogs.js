import React from "react";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import Panel from "../../commons/elements/containers/Panel";

const FavoriteBlogs = ({data}) => {
    return (
        <section>
            <div className="section-content">
                <h1>Blogs</h1>
                <i>Stories you added to favorites will be shown here.</i>
                <Panel>
                    {data.length > 0 ?
                        data.map(blog => (
                            <Card className="card-medium"
                                  key={blog.blog_id}
                                  id={blog.blog_id}
                                  type="blog"
                                  title={blog.blog_title}
                                  thumbnail={blog.blog_thumbnail}
                                  subtitle={blog.blog_subtitle}
                                  firstName={blog.first_name}
                                  lastName={blog.last_name}
                                  totalLike={blog.totalLike}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </Panel>
            </div>
        </section>
    )
}

export default FavoriteBlogs;