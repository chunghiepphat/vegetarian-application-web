import React, {useEffect, useRef, useState} from "react";
import "components/home/Home.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../assets/card-thumbnail-default.png";

const HomeBanner = () => {
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/get5bestrecipes`;
    const [recipes, setRecipes] = useState();
    console.log(recipes);

    // Fetches latest recipes by current user ID
    const getBestRecipes = async () => {
        const response = await fetch(api)
        const result = await response.json();
        return result;
    }

    // Executes fetch once on page load
    useEffect(async () => {
        const recipes = await getBestRecipes();
        setRecipes(recipes.listResult);
    }, []);

    return (
        <div className="banner-container">
            {recipes &&
            <div className="home-banner">
                {/*Large tile*/}
                <div className="tile-large">
                    <Link to={`/view/recipe/${recipes[0].recipe_id}`}>
                        <div className="tile-item">
                            <picture className="tile-thumbnail">
                                <source srcSet={""}/>
                                <img src={recipes[0].recipe_thumbnail} alt=""/>
                            </picture>
                            <div className="tile-overlay">
                                <div className="tile-description">
                                    <p className="tile-author"><Link
                                        to="/author">{recipes[0].first_name} {recipes[0].last_name}</Link></p>
                                    <p className="tile-title">{recipes[0].recipe_title}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                {/*Top left small tile*/}
                <div className="tile-small tile-small-1">
                    <Link to={`/view/recipe/${recipes[1].recipe_id}`}>
                        <div className="tile-item">
                            <picture className="tile-thumbnail">
                                <source srcSet={""}/>
                                <img src={recipes[1].recipe_thumbnail} alt=""/>
                            </picture>
                            <div className="tile-overlay">
                                <div className="tile-description">
                                    <p className="tile-author"><Link
                                        to="/author">{recipes[1].first_name} {recipes[1].last_name}</Link></p>
                                    <p className="tile-title">{recipes[1].recipe_title}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                {/*Top right small tile*/}
                <div className="tile-small tile-small-2">
                    <Link to={`/view/recipe/${recipes[2].recipe_id}`}>
                        <div className="tile-item">
                            <picture className="tile-thumbnail">
                                <source srcSet={""}/>
                                <img src={recipes[2].recipe_thumbnail} alt=""/>
                            </picture>
                            <div className="tile-overlay">
                                <div className="tile-description">
                                    <p className="tile-author"><Link
                                        to="/author">{recipes[2].first_name} {recipes[2].last_name}</Link></p>
                                    <p className="tile-title">{recipes[2].recipe_title}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                {/*Bottom left small tile*/}
                <div className="tile-small tile-small-3">
                    <Link to={`/view/recipe/${recipes[3].recipe_id}`}>
                        <div className="tile-item">
                            <picture className="tile-thumbnail">
                                <source srcSet={""}/>
                                <img src={recipes[3].recipe_thumbnail} alt=""/>
                            </picture>
                            <div className="tile-overlay">
                                <div className="tile-description">
                                    <p className="tile-author"><Link
                                        to="/author">{recipes[3].first_name} {recipes[3].last_name}</Link></p>
                                    <p className="tile-title">{recipes[3].recipe_title}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                {/*Bottom right small tile*/}
                <div className="tile-small tile-small-4">
                    <Link to={`/view/recipe/${recipes[4].recipe_id}`}>
                        <div className="tile-item">
                            <picture className="tile-thumbnail">
                                <source srcSet={""}/>
                                <img src={recipes[4].recipe_thumbnail} alt=""/>
                            </picture>
                            <div className="tile-overlay">
                                <div className="tile-description">
                                    <p className="tile-author"><Link
                                        to="/author">{recipes[4].first_name} {recipes[4].last_name}</Link></p>
                                    <p className="tile-title">{recipes[4].recipe_title}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            }

        </div>
    )
}

export default HomeBanner