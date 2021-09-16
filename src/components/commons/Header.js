import React, {useEffect, useState} from "react";
import "./Header.css";
import Brand from "./Brand";
import SearchForm from "./SearchForm";
import Navbar from "./Navbar";
import {Link, NavLink, useHistory, useLocation, withRouter} from "react-router-dom";
import jwtDecode from "jwt-decode";
import placeholderAvatar from "assets/user-image-default.png";

const Header = () => {
    const location = useLocation();
    const history = useHistory();

    // Checks for access token
    let user = null;
    let token = localStorage.getItem("accessToken");

    // Decodes the token and add decrypted values to user info
    if (token != null) {
        user = jwtDecode(localStorage.getItem("accessToken"));
        console.log(user);
    }

    // Checks scroll event to resize header with conditional CSS class
    const [small, setSmall] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setSmall(window.pageYOffset > 600)
            );
        }
    }, []);

    // Renders the header
    return (
        <header className={`site-header${small ? " small" : ""}`}>
            {/*Left side nav with logo and basic navigation links*/}
            <div>
                <Navbar>
                    <Link to="/"><Brand/></Link>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </Navbar>
                <SearchForm placeholder="What would you have for dinner?"/>
            </div>
            {/*Right-side nav with authentication and profile links*/}
            <div>
                <Navbar>
                    {
                        // Checks if access token exists
                        user ?
                            // If yes, shows user info and logout
                            <>
                                <NavLink to={`/profile/${user.id}`}>
                                    <picture className="profile-image">
                                        <source srcSet={user.image}/>
                                        <img src={placeholderAvatar} alt="avatar"/>
                                    </picture>
                                    {user.first_name}</NavLink>
                                <Link to={"/home"} onClick={() => {
                                    localStorage.removeItem("accessToken");
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
        </header>
    );
}

export default withRouter(Header);