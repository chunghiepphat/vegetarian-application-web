import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import bannerBackground from "assets/profile-banner-default.png";
import {UserContext} from "../../../context/UserContext";
import {FaAngleRight} from "react-icons/fa";
import ArticleTile from "../../commons/elements/containers/ArticleTile";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const HomeBanner = ({user, location}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiBase}/recipes/get5bestrecipes${user ? `?userID=${user.id}` : ``}`;
        const response = await fetch(api);
        try {
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, [location, user]);
    // Handle banner scroll button
    const scrollRef = useRef(null);
    const executeScroll = () => scrollRef.current.scrollIntoView({behavior: 'smooth'});

    return (
        <div className="banner-container banner-home">
            {/*Best recipes showcase banner*/}
            <div className="banner">
                <section className="banner-section banner-showcase">
                    <header className="section-header">
                        <h1>Popular recipes</h1>
                    </header>
                    <div className="section-content">
                        <div className="banner-panel">
                            {!isLoading ? <>
                                {!isError ? <>
                                    {data && data.length > 0 ? <>
                                        {data.map((item, index) => (
                                            <ArticleTile
                                                className={`${index === 0 ? "tile-half" : "tile-eighth tile-eighth-" + index}`}
                                                key={item.recipe_id}
                                                id={item.recipe_id}
                                                type="recipe"
                                                title={item.recipe_title}
                                                thumbnail={item.recipe_thumbnail}
                                                userId={item.user_id}
                                                firstName={item.first_name}
                                                lastName={item.last_name}
                                                time={item.time_created}
                                                isFavorite={item.is_like}
                                                totalLikes={item.totalLike}/>))}
                                    </> : <PanelEmp/>}
                                </> : <PanelErr reload={fetchData}/>}
                            </> : <PanelLoader/>}
                        </div>
                    </div>
                </section>
                {/*Arrow button for snap scrolling down*/}
                <button onClick={executeScroll} className="button-scroll"><span/></button>
                {/*Quick shortcuts section*/}
                <section className="banner-section banner-shortcuts">
                    <div ref={scrollRef} style={{position: "absolute", top: "-60px", left: "0"}}/>
                    {user ? <>
                        {/*If user is logged in, show shortcuts*/}
                        <header className="section-header">
                            <h1>What can we help you with?</h1>
                        </header>
                        <div className="section-content">
                            <Link className="banner-shortcut" to="/post/recipe">
                                Share a recipe <FaAngleRight/> </Link>
                            <Link className="banner-shortcut" to="/post/video">
                                Share a video <FaAngleRight/> </Link>
                            <Link className="banner-shortcut" to="/post/blog">
                                Share a story <FaAngleRight/> </Link>
                            <Link className="banner-shortcut" to="/menu">
                                Let us suggest this week's menu for you <FaAngleRight/> </Link>
                            <Link className="banner-shortcut" to="/health">
                                Manage your health profile & food preferences <FaAngleRight/> </Link>
                        </div>
                    </> : <>
                        {/*Otherwise, show authentication links*/}
                        <header className="section-header">
                            <h1>Sign in to get access to more features!</h1>
                        </header>
                        <div className="section-content">
                            <Link className="banner-shortcut" to={{
                                pathname: "/login",
                                state: {background: location}
                            }}> Sign in </Link>
                            <Link className="banner-shortcut" to={{
                                pathname: "/register",
                                state: {background: location}
                            }}> Create an account </Link>
                        </div>
                    </>}
                </section>
            </div>
            {/*Blurred banner background*/}
            <div className="banner-background" style={{backgroundImage: `url(${bannerBackground})`}}>
                <div className="banner-overlay"/>
            </div>
        </div>
    )
}

export default HomeBanner