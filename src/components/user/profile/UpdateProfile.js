import React, {useContext, useState} from "react";
import {profileDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import CountrySelect from "../../commons/elements/CountrySelect";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";

const UpdateProfile = ({reload}) => {
    // Localizations
    profileDisplayStrings.setLanguage(useContext(LocaleContext));
    requestErrorStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Initializes input data
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [aboutMe, setAboutMe] = useState(user.about_me);
    const [country, setCountry] = useState(user.profileDetailsCountry);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [facebookLink, setFacebookLink] = useState(user.facebook_link);
    const [instagramLink, setInstagramLink] = useState(user.instagram_link);
    const [gender, setGender] = useState(user.profileDetailsGender);
    const [birthdate, setBirthdate] = useState(user.birth_date);

    // Gets current date to limit date picker
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

    // Updates profile details
    const [isLoading, setIsLoading] = useState(false);
    const updateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
        const api = `${apiUrl}/user/update/details/${user.id}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                reload();
                alert(profileDisplayStrings.profileDetailsUpdateSuccess);
                setIsLoading(false);
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized);
                setIsLoading(false);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
        }
    }

    return (
        <section>
            <header className="section-header">
                <h1>{profileDisplayStrings.profileDetails}</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={updateProfile}>
                    <div style={{minHeight: "400px"}}>
                        <InputGroup>
                            <label>{profileDisplayStrings.profileDetailsFirstName}
                                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                       placeholder={profileDisplayStrings.profileDetailsFirstNamePlaceholder}/>
                            </label>
                            <label>{profileDisplayStrings.profileDetailsLastName}
                                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                       placeholder={profileDisplayStrings.profileDetailsLastNamePlaceholder}/>
                            </label>
                        </InputGroup>
                        <label>{profileDisplayStrings.profileDetailsEmail}
                            <input type="text" value={user.email} placeholder="" disabled/>
                        </label>
                        <label>{profileDisplayStrings.profileDetailsPhone}
                            <input type="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                                   placeholder={profileDisplayStrings.profileDetailsPhonePlaceholder}/>
                        </label>
                        <InputGroup>
                            <label>{profileDisplayStrings.profileDetailsGender}
                                <select value={gender} onChange={e => setGender(e.target.value)}>
                                    {genders.map((gender) => (
                                        <option>{gender}</option>
                                    ))}
                                </select>
                            </label>
                            <label>{profileDisplayStrings.profileDetailsBirthdate}
                                <input aria-label="Date of birth" type="date"
                                       value={birthdate} max={today}
                                       onChange={e => setBirthdate(e.target.value)}/>
                            </label>
                        </InputGroup>
                        <label>{profileDisplayStrings.profileDetailsCountry}
                            <CountrySelect value={country} onChange={e => setCountry(e.target.value)}/>
                        </label>
                        <label>{profileDisplayStrings.profileDetailsFacebook}
                            <input type="text" value={facebookLink} onChange={e => setFacebookLink(e.target.value)}
                                   placeholder="https://www.facebook.com/..."/>
                        </label>
                        <label>{profileDisplayStrings.profileDetailsInstagram}
                            <input type="text" value={instagramLink} onChange={e => setInstagramLink(e.target.value)}
                                   placeholder="https://www.instagram.com/..."/>
                        </label>
                        <label>{profileDisplayStrings.profileDetailsAbout}
                            <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)}
                                      placeholder={profileDisplayStrings.profileDetailsAboutPlaceholder}/>
                        </label>
                    </div>
                    <div className="sticky-bottom">
                        {!isLoading ?
                            <button type="submit"
                                    className="button-dark">{profileDisplayStrings.profileDetailsUpdate}</button>
                            : <button disabled>{profileDisplayStrings.profileDetailsUpdating}</button>}
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default UpdateProfile;