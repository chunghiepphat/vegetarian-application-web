import React, {useEffect, useState} from "react";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import VideoHeader from "./video/VideoHeader";
import VideoPlayer from "./video/VideoPlayer";
import {useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";

const ReviewVideo = () => {
    let {id} = useParams();
    const api = `${apiBase}/video/getvideoby/${id}`;
    const [data, setData] = useState();

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section>
            {data ?
                <div className="section-content">
                    <article>
                        <VideoHeader data={data}/>
                        <VideoPlayer data={data}/>
                    </article>
                </div>
                :
                <SectionLoader/>
            }
        </section>
    )
}

export default ReviewVideo;