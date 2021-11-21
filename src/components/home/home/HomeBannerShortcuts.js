import React from "react";
import LocalizedStrings from "react-localization";
import {Link, useLocation} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const HomeBannerShortcuts = ({user, scrollRef}) => {
    const location = useLocation();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            headerAuthenticated: "What can we help you with?",
            shareRecipe: "Share with us a recipe",
            shareVideo: "Share a how-to video",
            shareBlog: "Write an article or story",
            suggestMenu: "Let us suggest this week's menu for you",
            managePreferences: "Manage your body index, routines & food preferences",
            headerGuest: "Sign in to get access to more features!",
            signIn: "Sign in",
            signUp: "Create an account",
        },
        vi: {
            headerAuthenticated: "Chúng tôi có thể giúp được gì cho bạn?",
            shareRecipe: "Chia sẻ một công thức nấu ăn",
            shareVideo: "Đăng tải một video hướng dẫn",
            shareBlog: "Đăng tải một bài viết chia sẻ kinh nghiệm",
            suggestMenu: "Để chúng tôi đề xuất cho bạn thực đơn tuần này",
            managePreferences: "Quản lý các chỉ số cơ thể, chế độ tập luyện và các loại thực phẩm ưa thích",
            headerGuest: "Đăng nhập để nâng cao trải nghiệm của bạn!",
            signIn: "Đăng nhập",
            signUp: "Chưa có tài khoản? Đăng ký",
        }
    });

    return (
        <section className="banner-section banner-shortcuts">
            <div ref={scrollRef} style={{position: "absolute", top: "-60px", left: "0"}}/>
            {user ? <>
                {/*If user is logged in, show shortcuts*/}
                <header className="section-header">
                    <h1>{strings.headerAuthenticated}</h1>
                </header>
                <div className="section-content">
                    <Link className="banner-shortcut" to="/post/recipe">
                        {strings.shareRecipe} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/post/video">
                        {strings.shareVideo} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/post/blog">
                        {strings.shareBlog} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/menu">
                        {strings.suggestMenu} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/health">
                        {strings.managePreferences} <FaAngleRight/></Link>
                </div>
            </> : <>
                {/*Otherwise, show authentication links*/}
                <header className="section-header">
                    <h1>{strings.headerGuest}</h1>
                </header>
                <div className="section-content">
                    <Link className="banner-shortcut" to={{
                        pathname: "/login",
                        state: {background: location}
                    }}>{strings.signIn} <FaAngleRight/></Link>
                    <Link className="banner-shortcut" to="/auth/register">
                        {strings.signUp} <FaAngleRight/></Link>
                </div>
            </>}
        </section>
    )
}

export default HomeBannerShortcuts;
