import React, {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import {homeDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {FaAngleRight} from "react-icons/fa";

const HomeShortcuts = ({user, scrollRef}) => {
    const location = useLocation();
    // Localizations
    homeDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="banner-section banner-shortcuts">
            <div ref={scrollRef} style={{position: "absolute", top: "-60px", left: "0"}}/>
            {user ? <>
                {/*If user is logged in, show shortcuts*/}
                <header className="section-header">
                    <h1>{homeDisplayStrings.homeShortcutsHeaderAuthenticated}</h1>
                </header>
                <div className="section-content">
                    <Link className="banner-shortcut" to="/post/recipe">
                        {homeDisplayStrings.homeShortcutsShareRecipe} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/post/video">
                        {homeDisplayStrings.homeShortcutsShareVideo} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/post/blog">
                        {homeDisplayStrings.homeShortcutsShareBlog} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/menu">
                        {homeDisplayStrings.homeShortcutsSuggestMenu} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/health">
                        {homeDisplayStrings.homeShortcutsManagePreferences} <FaAngleRight/></Link>
                </div>
            </> : <>
                {/*Otherwise, show authentication links*/}
                <header className="section-header">
                    <h1>{homeDisplayStrings.homeShortcutsHeaderGuest}</h1>
                </header>
                <div className="section-content">
                    <Link className="banner-shortcut" to={{
                        pathname: "/login",
                        state: {background: location}
                    }}>{homeDisplayStrings.homeShortcutsSignIn} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/auth/register">
                        {homeDisplayStrings.homeShortcutsSignUp} <FaAngleRight/></Link>
                </div>
            </>}
        </section>
    )
}

export default HomeShortcuts;
