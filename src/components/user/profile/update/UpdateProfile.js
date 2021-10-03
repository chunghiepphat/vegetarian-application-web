import React, {useState} from "react";
import {apiPattern} from "../../../../helpers/Helpers";
import {useHistory} from "react-router-dom";
import CountrySelect from "../../../commons/elements/CountrySelect";

const UpdateProfile = () => {
    // Authentication and API stuff
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiPattern}/user/update/details/${user.id}`;
    const history = useHistory();

    // Initializes parameters
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [aboutMe, setAboutMe] = useState(user.about_me);
    const [country, setCountry] = useState(user.country);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [facebookLink, setFacebookLink] = useState(user.facebook_link);
    const [instagramLink, setInstagramLink] = useState(user.instagram_link);

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const editProfile = async (event) => {
        event.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "about_me": aboutMe,
            "country": country,
            "phone_number": phoneNumber,
            "facebook_link": facebookLink,
            "instagram_link": instagramLink,
        });

        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };

        // Executes fetch
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Profile updated.");
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
        const result = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(result));
        history.push("/home");
    }

    return (
        <section>
            <header className="section-header">
                <h1>Profile details</h1>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={editProfile}>
                    {/*Name*/}
                    <label>
                        <span>Name</span>
                        <div className="input-group">
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                   placeholder="First name"/>
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                   placeholder="Last name"/>
                        </div>
                    </label>
                    {/*Email*/}
                    <label>
                        <span>Email address</span>
                        <span className="tooltip">(?)
                        <span className="tooltip-text">You cannot edit your email address.
                            If you wish to have yours changed, please contact support.</span></span>
                        <input type="text" value={user.email} placeholder="" disabled/>
                    </label>
                    {/*Phone*/}
                    <label>
                        <span>Phone number</span>
                        <input type="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                               placeholder="09876..."/>
                    </label>
                    {/*Country*/}
                    <label>
                        <span>Country</span>
                        <CountrySelect value={country} onChange={e => setCountry(e.target.value)}/>
                    </label>
                    {/*Facebook*/}
                    <label>
                        <span>Facebook profile</span>
                        <input type="text" value={facebookLink} onChange={e => setFacebookLink(e.target.value)}
                               placeholder="https://www.facebook.com/..."/>
                    </label>
                    {/*Instagram*/}
                    <label>
                        <span>Instagram profile</span>
                        <input type="text" value={instagramLink} onChange={e => setInstagramLink(e.target.value)}
                               placeholder="https://www.instagram.com/..."/>
                    </label>
                    {/*Bio*/}
                    <label>
                        <span>Bio</span>
                        <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)}
                                  placeholder="Write a short something about you..."/>
                    </label>
                    <button>Update</button>
                </form>
            </div>
        </section>
    );
}

export default UpdateProfile;