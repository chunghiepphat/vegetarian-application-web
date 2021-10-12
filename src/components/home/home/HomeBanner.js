import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import {PanelLoader} from "../../commons/elements/loaders/Loader";

const HomeBanner = () => {
    const api = `${apiBase}/recipes/get5bestrecipes`;
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
                    <div className="tile tile-half">
                        <Link className="tile-url" to={`/view/recipe/${data[0].recipe_id}`}/>
                        <picture className="tile-thumbnail">
                            <source srcSet={""}/>
                            <img src={data[0].recipe_thumbnail} alt=""/>
                        </picture>
                        <div className="tile-overlay">
                            <div className="tile-details">
                                <h1 className="tile-title">{data[0].recipe_title}</h1>
                                <p className="tile-author">by {data[0].first_name} {data[0].last_name}</p>
                            </div>
                        </div>
                    </div>
                    {/*Top left small tile*/}
                    <div className="tile tile-eighth tile-eighth-1">
                        <Link className="tile-url" to={`/view/recipe/${data[1].recipe_id}`}/>
                        <picture className="tile-thumbnail">
                            <source srcSet={""}/>
                            <img src={data[1].recipe_thumbnail} alt=""/>
                        </picture>
                        <div className="tile-overlay">
                            <div className="tile-details">
                                <h1 className="tile-title">{data[1].recipe_title}</h1>
                                <p className="tile-author">by {data[1].first_name} {data[1].last_name}</p>
                            </div>
                        </div>
                    </div>
                    {/*Top right small tile*/}
                    <div className="tile tile-eighth tile-eighth-2">
                        <Link className="tile-url" to={`/view/recipe/${data[2].recipe_id}`}/>
                        <picture className="tile-thumbnail">
                            <source srcSet={""}/>
                            <img src={data[2].recipe_thumbnail} alt=""/>
                        </picture>
                        <div className="tile-overlay">
                            <div className="tile-details">
                                <h1 className="tile-title">{data[2].recipe_title}</h1>
                                <p className="tile-author">by {data[2].first_name} {data[2].last_name}</p>
                            </div>
                        </div>
                    </div>
                    {/*Bottom left small tile*/}
                    <div className="tile tile-eighth tile-eighth-3">
                        <Link className="tile-url" to={`/view/recipe/${data[3].recipe_id}`}/>
                        <picture className="tile-thumbnail">
                            <source srcSet={""}/>
                            <img src={data[3].recipe_thumbnail} alt=""/>
                        </picture>
                        <div className="tile-overlay">
                            <div className="tile-details">
                                <h1 className="tile-title">{data[3].recipe_title}</h1>
                                <p className="tile-author">by {data[3].first_name} {data[3].last_name}</p>
                            </div>
                        </div>
                    </div>
                    {/*Bottom right small tile*/}
                    <div className="tile tile-eighth tile-eighth-4">
                        <Link className="tile-url" to={`/view/recipe/${data[4].recipe_id}`}/>
                        <picture className="tile-thumbnail">
                            <source srcSet={""}/>
                            <img src={data[4].recipe_thumbnail} alt=""/>
                        </picture>
                        <div className="tile-overlay">
                            <div className="tile-details">
                                <h1 className="tile-title">{data[4].recipe_title}</h1>
                                <p className="tile-author">by {data[4].first_name} {data[4].last_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <PanelLoader/>
            }
        </div>
    )
}

export default HomeBanner