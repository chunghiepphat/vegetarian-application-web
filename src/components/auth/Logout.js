import React, {useContext} from "react";
import {useGoogleLogout} from "react-google-login";
import {Link, useHistory} from "react-router-dom";
import {authDisplayStrings} from "../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../context/LocaleContext";

const Logout = () => {
    const history = useHistory();
    const {signOut, loaded} = useGoogleLogout({})

    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <Link to={"/home"} onClick={() => {
            if (loaded) signOut();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            alert(authDisplayStrings.logoutSuccess);
            history.push("/home");
        }}>{authDisplayStrings.logout}</Link>
    )
}

export default Logout;