import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import VideoPlayer from "./video/VideoPlayer";
import VideoDetails from "./video/VideoDetails";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";
import VideoToolbar from "./video/VideoToolbar";
import VideoComments from "./video/VideoComments";

const ViewVideo = ({user, location, fetchData}) => {
    let {id} = useParams();
    // Data states & API endpoint
    const [data, setData] = useState();
    const [language, setLanguage] = useState("vi");
    const [isError, setIsError] = useState();
    const api = `${apiUrl}/video/getvideoby/${id}?translate=${language}${user ? `&userID=${user.id}` : ``}`;
    // Fetches data on page load
    useEffect(() => {
        fetchData(api, setData, setIsError);
    }, [id]);

    return (
        <section>
            {!isError ? <>
                {data ? <>
                    <div className="section-content">
                        <article className="video-article">
                            <VideoPlayer data={data}/>
                            <VideoToolbar id={id} location={location} data={data} setLanguage={setLanguage}
                                          reload={() => fetchData(api, setData, setIsError)}/>
                            <VideoDetails data={data}/>
                            <VideoComments data={data}/>
                        </article>
                    </div>
                </> : <SectionEmp message="Loading the article..."/>}
            </> : <SectionErr reload={() => fetchData(api, setData, setIsError)}/>}
        </section>
    )
}

export default ViewVideo;