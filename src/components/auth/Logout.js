import React from "react";
import {useGoogleLogout} from "react-google-login";
import {Link, useHistory} from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    const {signOut, loaded} = useGoogleLogout({})

    return (
        <Link to={"/home"} onClick={() => {
            if (loaded) signOut();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            alert("You are now logged out.");
            history.push("/home");
        }}>Sign out</Link>
    )
}

export default Logout;