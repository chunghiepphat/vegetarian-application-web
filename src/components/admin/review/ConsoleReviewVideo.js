import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import VideoPlayer from "../../home/view/video/VideoPlayer";
import VideoDetails from "../../home/view/video/VideoDetails";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";
import {FaCheck, FaTimes} from "react-icons/all";

const ConsoleReviewVideo = () => {
    let {id} = useParams();
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const statusText = [
        "Waiting for review.",
        "Approved & published.",
        "Rejected & hidden."
    ]
    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchData = async () => {
        setIsError(false);
        const api = `${apiUrl}/video/getvideoby/${id}`;
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }
    const approveArticle = async (e, status) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "status": status,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/video/approve/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            await fetchData();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <>
            <div className="console-toolbar">
                {data && <h1>Video {id}</h1>}
                {data && <p className={statusColor[data.status - 1]}>{statusText[data.status - 1]}</p>}
                {data && <>
                    {data.status !== 2 ?
                        <button className="button-dark" onClick={e => approveArticle(e, 2)}>Approve</button>
                        : <button disabled><FaCheck/> Approved</button>}
                    {data.status !== 3 ?
                        <button className="button-light" onClick={e => approveArticle(e, 3)}>Reject</button>
                        : <button disabled><FaTimes/> Rejected</button>}
                </>}
            </div>
            <div className="console-article">
                {!isError ? <>
                    {data ? <>
                        <div className="section-content">
                            <article className="video-article">
                                <VideoPlayer data={data}/>
                                <VideoDetails data={data}/>
                            </article>
                        </div>
                    </> : <SectionEmp message="Loading the video..."/>}
                </> : <SectionErr reload={fetchData}/>}
            </div>
        </>
    )
}

export default ConsoleReviewVideo;