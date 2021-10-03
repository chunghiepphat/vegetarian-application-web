import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiPattern} from "../../../helpers/Helpers";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const HomeBanner = () => {
    const api = `${apiPattern}/recipes/get5bestrecipes`;
    const [data, setData] = useState();

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    return (
        <div className="banner-container">
            {data ?
                <div className="panel-banner">
                    {/*Large tile*/}
                    <div className="tile-large">
                        <Link to={`/view/recipe/${data[0].recipe_id}`}>
                            <div className="tile-item">
                                <picture className="tile-thumbnail">
                                    <source srcSet={""}/>
                                    <img src={data[0].recipe_thumbnail} alt=""/>
                                </picture>
                                <div className="tile-overlay">
                                    <div className="tile-description">
                                        <p className="tile-author">{data[0].first_name} {data[0].last_name}</p>
                                        <p className="tile-title">{data[0].recipe_title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/*Top left small tile*/}
                    <div className="tile-small tile-small-1">
                        <Link to={`/view/recipe/${data[1].recipe_id}`}>
                            <div className="tile-item">
                                <picture className="tile-thumbnail">
                                    <source srcSet={""}/>
                                    <img src={data[1].recipe_thumbnail} alt=""/>
                                </picture>
                                <div className="tile-overlay">
                                    <div className="tile-description">
                                        <p className="tile-author">{data[1].first_name} {data[1].last_name}</p>
                                        <p className="tile-title">{data[1].recipe_title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/*Top right small tile*/}
                    <div className="tile-small tile-small-2">
                        <Link to={`/view/recipe/${data[2].recipe_id}`}>
                            <div className="tile-item">
                                <picture className="tile-thumbnail">
                                    <source srcSet={""}/>
                                    <img src={data[2].recipe_thumbnail} alt=""/>
                                </picture>
                                <div className="tile-overlay">
                                    <div className="tile-description">
                                        <p className="tile-author">{data[2].first_name} {data[2].last_name}</p>
                                        <p className="tile-title">{data[2].recipe_title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/*Bottom left small tile*/}
                    <div className="tile-small tile-small-3">
                        <Link to={`/view/recipe/${data[3].recipe_id}`}>
                            <div className="tile-item">
                                <picture className="tile-thumbnail">
                                    <source srcSet={""}/>
                                    <img src={data[3].recipe_thumbnail} alt=""/>
                                </picture>
                                <div className="tile-overlay">
                                    <div className="tile-description">
                                        <p className="tile-author">{data[3].first_name} {data[3].last_name}</p>
                                        <p className="tile-title">{data[3].recipe_title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/*Bottom right small tile*/}
                    <div className="tile-small tile-small-4">
                        <Link to={`/view/recipe/${data[4].recipe_id}`}>
                            <div className="tile-item">
                                <picture className="tile-thumbnail">
                                    <source srcSet={""}/>
                                    <img src={data[4].recipe_thumbnail} alt=""/>
                                </picture>
                                <div className="tile-overlay">
                                    <div className="tile-description">
                                        <p className="tile-author">{data[4].first_name} {data[4].last_name}</p>
                                        <p className="tile-title">{data[4].recipe_title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                :
                <PanelLoader/>
            }
        </div>
    )
}

export default HomeBanner