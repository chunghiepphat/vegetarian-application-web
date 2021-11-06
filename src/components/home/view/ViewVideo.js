import React, {useEffect, useState} from "react";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import VideoDetails from "./video/VideoDetails";
import VideoPlayer from "./video/VideoPlayer";
import {useLocation, useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewVideo = ({data, isLoading, isError, fetchData}) => {
    let {id} = useParams();
    const location = useLocation();
    const api = `${apiBase}/video/getvideoby/${id}`;
    useEffect(() => {
        fetchData(api)
    }, [id, location]);

    return (
        <section>
            {!isLoading ? <>
                {!isError ? <>
                    {data ? <>
                        <div className="section-content">
                            <article>
                                <VideoPlayer data={data}/>
                                <VideoDetails data={data}/>
                            </article>
                        </div>
                    </> : <SectionEmp/>}
                </> : <SectionErr reload={fetchData}/>}
            </> : <SectionLoader/>}
        </section>
    )
}

export default ViewVideo;