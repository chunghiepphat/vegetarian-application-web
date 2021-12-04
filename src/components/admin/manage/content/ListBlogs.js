import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";

const ListBlogs = ({user, filter, isLoading, isError, fetchData}) => {
    const api = `${apiUrl}/blogs/admin/getall?page=1&limit=300`;
    const [data, setData] = useState([]);
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api, data, setData);
    }, [user, filter]);

    return (
        <Panel filler="card--medium">
            {!isLoading ? <>
                {!isError ? <>
                    {data && data.length > 0 ? <>
                        {data.map(item => (
                            <ArticleCard className="card--medium"
                                         key={item.blog_id}
                                         id={item.blog_id}
                                         type="blog"
                                         title={item.blog_title}
                                         thumbnail={item.blog_thumbnail}
                                         subtitle={item.blog_subtitle}
                                         userId={item.user_id}
                                         firstName={item.first_name}
                                         lastName={item.last_name}
                                         time={item.time_created}
                                         totalLikes={item.totalLike}
                                         status={item.status}/>))}
                    </> : <PanelEmp/>}
                </> : <PanelErr reload={fetchData} api={api}/>}
            </> : <PanelLoader/>}
        </Panel>
    )

}

export default ListBlogs;