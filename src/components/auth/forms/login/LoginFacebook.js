import React, {useState} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import {appId} from "../../../../helpers/Facebook";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {FaFacebookF} from "react-icons/fa";
import jwtDecode from "jwt-decode";
import LocalizedStrings from "react-localization";

const LoginFacebook = ({history, background}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            buttonFacebook: "Continue with Facebook",
        },
        vi: {
            buttonFacebook: "Đăng nhập bằng Facebook",
        }
    });
    // Handles login
    const responseFacebook = async (res) => {
        if (res) {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            // Generates request body
            let body;
            try {
                body = JSON.stringify({
                    "first_name": res.first_name,
                    "last_name": res.last_name,
                    "email": res.email,
                    "image": res.picture.data.url,
                });
            } catch (error) {

            }
            // Generates request
            let request = {
                method: 'POST',
                headers: headers,
                body: body,
            };
            // Executes fetch
            const api = `${apiUrl}/user/signin/facebook`;
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

    return (
        <FacebookLogin
            appId={appId}
            autoLoad={false}
            callback={responseFacebook}
            fields="first_name,last_name,email,picture"
            render={renderProps => (
                <button onClick={renderProps.onClick} className="button-facebook">
                    <FaFacebookF/> {strings.buttonFacebook}</button>)}/>
    )
}

export default LoginFacebook;