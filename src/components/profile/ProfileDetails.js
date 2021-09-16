import React from "react";
import "./ProfileDetails.css";
import Deck from "../commons/Deck";
import jwtDecode from "jwt-decode";

const ProfileDetails = () => {
    let user = jwtDecode(localStorage.getItem("accessToken"));

    return (
        <div>
            <section>
                <h1>Your recent posts</h1>
                {user.first_name}
                <Deck/>
            </section>

        </div>
    )
}
export default ProfileDetails;