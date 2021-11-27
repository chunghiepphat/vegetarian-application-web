import React, {useContext, useEffect, useState} from "react";
import {viewDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {useLocation, useParams} from "react-router-dom";
import ArticleToolbar from "./ArticleToolbar";
import ArticleComments from "./ArticleComments";
import VideoPlayer from "./video/VideoPlayer";
import VideoDetails from "./video/VideoDetails";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewVideo = ({user, fetchData}) => {
    let {id} = useParams();
    const location = useLocation();

    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));

    // Fetches article content on page load
    const [data, setData] = useState();
    const [locale, setLocale] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const api = `${apiUrl}/video/getvideoby/${id}?translate=${locale}${user ? `&userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api, setData, setIsError, setIsLoading);
    }, [id, api, location]);

    return (
        <section>
            {!isError ? <>
                {data ? <>
                    <div className="section-content">
                        <article className="video-article">
                            <VideoPlayer data={data}/>
                            <ArticleToolbar type={"video"} id={id} data={data}
                                            isLoading={isLoading} setLocale={setLocale}
                                            reload={() => fetchData(api, setData, setIsError, setIsLoading)}/>
                            <VideoDetails data={data}/>
                            <ArticleComments type={"video"} data={data}/>
                        </article>
                    </div>
                </> : <SectionEmp message={viewDisplayStrings.viewVideoLoading}/>}
            </> : <SectionErr reload={() => fetchData(api, setData, setIsError)}/>}
        </section>
    )
}

export default ViewVideo;