import React, {useContext, useEffect, useState} from "react";
import "./Header.css";
import LocalizedStrings from "react-localization";
import {NavLink, useLocation, withRouter} from "react-router-dom";
import {UserContext} from "../../../../context/UserContext";
import placeholderAvatar from "assets/user-image-default.png";
import Brand from "./Brand";
import Navbar from "../bars/Navbar";
import SearchBar from "../SearchBar";
import Logout from "../../../auth/Logout";

const Header = () => {
    const location = useLocation();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            urlHome: "Home",
            urlAbout: "About",
            searchPlaceholder: "What would you have for dinner?",
            urlProfile: "Your profile",
            urlSignIn: "Sign in",
            urlSignUp: "Sign up",
        },
        vi: {
            urlHome: "Trang chủ",
            urlAbout: "Giới thiệu",
            searchPlaceholder: "Tối nay ăn gì?",
            urlProfile: "Hồ sơ",
            urlSignIn: "Đăng nhập",
            urlSignUp: "Đăng ký",
        }
    });
    // Gets user info
    const user = useContext(UserContext);
    let token = JSON.parse(localStorage.getItem("accessToken"));
    // Checks scroll offset to resize header with conditional CSS class
    const [shrink, setShrink] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setShrink(window.pageYOffset > 400)
            );
        }
    }, []);

    // Renders the header
    return (
        <header className={`header-container ${shrink ? "header-show" : ""}`}>
            {/*Left side nav with logo and basic navigation links*/}
            <div className="header-content">
                <section className="header-section">
                    <Brand/>
                    <Navbar>
                        {/*<Link to="/"><Brand/></Link>*/}
                        <NavLink to="/home">{strings.urlHome}</NavLink>
                        <NavLink to="/about">{strings.urlAbout}</NavLink>
                    </Navbar>
                    <SearchBar placeholder={strings.searchPlaceholder}/>
                </section>
                {/*Right-side nav with authentication and profile links*/}
                <section className="header-section">
                    <Navbar>
                        {token ? <>
                            <NavLink to="/profile">
                                {user ? <>
                                    <picture className="profile-image">
                                        <source srcSet={user.profile_image}/>
                                        <img src={placeholderAvatar} alt=""/>
                                    </picture>
                                    {user.first_name}
                                </> : <>{strings.urlProfile}</>}
                            </NavLink>
                            <Logout/>
                        </> : <>
                            <NavLink to={{
                                pathname: "/login",
                                state: {background: location}
                            }}>{strings.urlSignIn}</NavLink>
                            <NavLink to={{
                                pathname: "/auth/register",
                            }}>{strings.urlSignUp}</NavLink>
                        </>}
                    </Navbar>
                </section>
            </div>
        </header>
    );
}

export default withRouter(Header);