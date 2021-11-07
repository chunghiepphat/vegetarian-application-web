import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import VideoPlayer from "./video/VideoPlayer";
import VideoDetails from "./video/VideoDetails";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";
import VideoToolbar from "./video/VideoToolbar";

const ViewVideo = ({user, location, data, isLoading, isError, fetchData}) => {
    let {id} = useParams();
    const api = `${apiBase}/video/getvideoby/${id}${user ? `?userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api)
    }, [id, location]);

    return (
        <section>
            {!isLoading ? <>
                {!isError ? <>
                    {data ? <>
                        <div className="section-content">
                            <article className="video-article">
                                <VideoPlayer data={data}/>
                                <VideoToolbar data={data} reload={fetchData} mainApi={api}/>
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