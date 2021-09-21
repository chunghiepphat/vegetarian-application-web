import React, {useEffect, useState} from "react";
import "./Header.css";
import SearchForm from "../elements/SearchForm";
import Navbar from "../elements/Navbar";
import {Link, NavLink, useHistory, useLocation, withRouter} from "react-router-dom";
import placeholderAvatar from "assets/user-image-default.png";

const Header = () => {
    // Get user info
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let token = JSON.parse(localStorage.getItem("accessToken"));
    const location = useLocation();
    const history = useHistory();

    // Checks scroll offset to resize header with conditional CSS class
    const [small, setSmall] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setSmall(window.pageYOffset > 200)
            );
        }
    }, []);

    // Renders the header
    return (
        <header className={`header-container${small ? " small" : ""}`}>
            {/*Left side nav with logo and basic navigation links*/}
            <div className="header-content">
                <div>
                    <Navbar>
                        {/*<Link to="/"><Brand/></Link>*/}
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </Navbar>
                    <SearchForm placeholder="What would you have for dinner?"/>
                </div>
                {/*Right-side nav with authentication and profile links*/}
                <div>
                    <Navbar>
                        {
                            // Fragment to check if access token exists
                            token ?
                                // If yes, shows user info and logout
                                <>
                                    {/*Profile image*/}
                                    <NavLink to={`/${user.id}`}>
                                        <picture className="profile-image">
                                            <source srcSet={user.image}/>
                                            <img src={placeholderAvatar} alt="avatar"/>
                                        </picture>
                                        {user.first_name}</NavLink>
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
                </div>
            </div>
        </header>
    );
}

export default withRouter(Header);