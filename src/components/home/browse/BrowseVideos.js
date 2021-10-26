import React, {useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import Panel from "../../commons/elements/containers/Panel";

const BrowseVideos = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const api = `${apiBase}/video/getall?page=1&limit=100`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result.listVideo);
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
                <h1>Videos</h1>
                <i>Follow along and try for yourself with these how-to videos.</i>
                {data &&
                <Panel filler="card-medium">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(video => (
                            <Card className="card-medium"
                                  key={video.id}
                                  id={video.id}
                                  type="video"
                                  title={video.video_title}
                                  thumbnail={video.video_link}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </Panel>}
            </div>
        </section>
    )
}

export default BrowseVideos;