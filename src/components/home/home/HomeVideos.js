import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const HomeVideos = () => {
    const api = `${apiBase}/video/get4videos`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listVideo);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Latest how-to videos</h1>
                <Link to="/browse/videos"><FaAngleRight/>See more</Link>
            </header>
            <div className="section-content">
                {data &&
                <Panel>
                    {data.length > 0 ? data.map(item => (
                            <video width="320" height="210" controls>
                                <source src={item.video_link} type="video/mp4"/>
                            </video>
                        ))
                        :
                        <PanelLoader/>
                    }
                </Panel>}
            </div>
        </section>
    )
}

export default HomeVideos;