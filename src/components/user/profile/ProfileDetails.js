import React, {useContext, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import CountrySelect from "../../commons/elements/CountrySelect";
import {UserContext} from "../../../context/UserContext";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";

const ProfileDetails = () => {
    // Authentication and API stuff
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/user/update/details/${user.id}`;

    // Initializes parameters
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [aboutMe, setAboutMe] = useState(user.about_me);
    const [country, setCountry] = useState(user.country);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [facebookLink, setFacebookLink] = useState(user.facebook_link);
    const [instagramLink, setInstagramLink] = useState(user.instagram_link);
    const [gender, setGender] = useState(user.gender);
    const [birthdate, setBirthdate] = useState(user.birth_date);

    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    if (currentMonth < 10) currentMonth = "0" + currentMonth;
    let currentYear = new Date().getFullYear();
    const today = currentYear + "-" + currentMonth + "-" + currentDate;
    const genders = ["Male", "Female"];

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const updateProfile = async (event) => {
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
            "birth_date": birthdate,
            "gender": gender,
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
            window.location.reload()
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    return (
        <section>
            <header className="section-header">
                <h1>Profile details</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={updateProfile}>
                    <InputGroup>
                        <label>First name
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                   placeholder="First name"/>
                        </label>
                        <label>Last name
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                   placeholder="Last name"/>
                        </label>
                    </InputGroup>
                    <label>Email address
                        <input type="text" value={user.email} placeholder="" disabled/>
                    </label>
                    <label>Phone number
                        <input type="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                               placeholder="09876..."/>
                    </label>
                    <InputGroup>
                        <label>Gender
                            <select value={gender} onChange={e => setGender(e.target.value)}>
                                {genders.map((gender) => (
                                    <option>{gender}</option>
                                ))}
                            </select>
                        </label>
                        <label>Date of birth
                            <input aria-label="Date of birth" type="date"
                                   value={birthdate} max={today}
                                   onChange={e => setBirthdate(e.target.value)}/>
                        </label>
                    </InputGroup>
                    <label>Country
                        <CountrySelect value={country} onChange={e => setCountry(e.target.value)}/>
                    </label>
                    <label>Facebook profile
                        <input type="text" value={facebookLink} onChange={e => setFacebookLink(e.target.value)}
                               placeholder="https://www.facebook.com/..."/>
                    </label>
                    <label>Instagram profile
                        <input type="text" value={instagramLink} onChange={e => setInstagramLink(e.target.value)}
                               placeholder="https://www.instagram.com/..."/>
                    </label>
                    <label>About you
                        <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)}
                                  placeholder="Write a short something about you..."/>
                    </label>
                    <button type="submit" className="button-submit">Update</button>
                </Form>
            </div>
        </section>
    );
}

export default ProfileDetails;