import React, {useContext, useEffect, useState} from "react";
import "./Header.css";
import SearchBar from "../SearchBar";
import Navbar from "../bars/Navbar";
import {Link, NavLink, useHistory, useLocation, withRouter} from "react-router-dom";
import {UserContext} from "../../../../context/UserContext";
import placeholderAvatar from "assets/user-image-default.png";
import Brand from "./Brand";

const Header = () => {
    // Get user info
    let token = JSON.parse(localStorage.getItem("accessToken"));
    const user = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();

    // Checks scroll offset to resize header with conditional CSS class
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setShow(window.pageYOffset > 400)
            );
        }
    }, []);

    // Renders the header
    return (
        <header className={`header-container ${show ? "header-show" : ""}`}>
            {/*Left side nav with logo and basic navigation links*/}
            <div className="header-content">
                <section className="header-section">
                    <Brand/>
                    <Navbar>
                        {/*<Link to="/"><Brand/></Link>*/}
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </Navbar>
                    <SearchBar placeholder="What would you have for dinner?"/>
                </section>
                {/*Right-side nav with authentication and profile links*/}
                <section className="header-section">
                    <Navbar>
                        {token ?
                            // If yes, shows user info and logout
                            <>
                                {/*Profile image*/}
                                <NavLink to="/profile">
                                    {user ?
                                        <>
                                            <picture className="profile-image">
                                                <source srcSet={user.profile_image}/>
                                                <img src={placeholderAvatar} alt=""/>
                                            </picture>
                                            {user.first_name}
                                        </>
                                        :
                                        <>Your Profile</>
                                    }
                                </NavLink>
                                {/*Logout link*/}
                                <Link to={"/home"} onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("userInfo");
                                    alert("You are now logged out.");
                                    history.push("/home");
                                }}>Sign out</Link>
                            </>
                            :
                            // If not, shows login and register
                            <>
                                <NavLink to={{
                                    pathname: "/login",
                                    state: {background: location}
                                }}>Sign in</NavLink>
                                <NavLink to={{
                                    pathname: "/register",
                                    state: {background: location}
                                }}>Sign up</NavLink>
                            </>
                        }
                    </Navbar>
                </section>
            </div>
        </header>
    );
}

export default withRouter(Header);