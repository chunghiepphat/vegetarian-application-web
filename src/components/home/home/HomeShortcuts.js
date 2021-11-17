import React from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const HomeShortcuts = ({user, location, scrollRef}) => {
    return (
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
                    <Link className="banner-shortcut" to="/auth/register"> Create an account </Link>
                </div>
            </>}
        </section>
    )
}

export default HomeShortcuts;
