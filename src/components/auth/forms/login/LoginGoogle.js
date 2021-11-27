import React, {useContext} from "react";
import {authDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {apiUrl} from "../../../../helpers/Variables";
import {clientId} from "../../../../helpers/Google";
import {GoogleLogin} from "react-google-login";
import {FcGoogle} from "react-icons/all";
import jwtDecode from "jwt-decode";

const LoginGoogle = ({history, background}) => {
    // Localizations
    authDisplayStrings.setLanguage(useContext(LocaleContext));

    // Handles login
    const onSuccess = async (res) => {
        if (res) {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            // Generates request body
            let body = JSON.stringify({
                "first_name": res.profileObj.givenName,
                "last_name": res.profileObj.familyName,
                "email": res.profileObj.email,
                "image": res.profileObj.imageUrl,
            });
            // Generates request
            let request = {
                method: 'POST',
                headers: headers,
                body: body,
            };
            // Executes fetch
            const api = `${apiUrl}/user/signin/google`;
            const response = await fetch(api, request)
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem("accessToken", JSON.stringify(result));
                localStorage.setItem("userInfo", JSON.stringify(jwtDecode(JSON.stringify(result))));
                history.push(background);
            } else if (response.status >= 400 && response.status < 600) {
                const error = response.json();
                let message = error.message;
                if (message !== undefined) alert(message);
                else alert("An unexpected error has occurred. Status code: " + response.status);
            }
        }
    }
    const onFailure = (res) => {
        console.log('Login failed Response: ', res);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            render={renderProps => (
                <button className="button-google" onClick={renderProps.onClick}>
                    <FcGoogle/> {authDisplayStrings.loginGoogle}</button>)}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}/>
    )
}

export default LoginGoogle;
