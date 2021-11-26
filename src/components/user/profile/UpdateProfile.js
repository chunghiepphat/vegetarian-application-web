import React, {useContext, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import CountrySelect from "../../commons/elements/CountrySelect";
import LocalizedStrings from "react-localization";

const UpdateProfile = ({reload}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            updateProfileHeader: "Profile details",
            firstName: "First name",
            firstNamePlaceHolder: "First name",
            lastName: "Last name",
            lastNamePlaceholder: "Last name",
            email: "Email address",
            phoneNumber: "Phone number",
            phoneNumberPlaceholder: "09876...",
            gender: "Gender",
            birthdate: "Date of birth",
            country: "Country",
            facebookLink: "Facebook url",
            instagramLink: "Instagram url",
            aboutMe: "About you",
            aboutMePlaceholder: "Write a short something about you...",
            updateButton: "Update",
            updatingButton: "Updating...",
            alertSuccess: "Profile updated.",
        },
        vi: {
            updateProfileHeader: "Chi tiết hồ sơ",
            firstName: "Tên",
            firstNamePlaceHolder: "Tên",
            lastName: "Họ",
            lastNamePlaceholder: "Họ",
            email: "Địa chỉ email",
            phoneNumber: "Số điện thoại",
            phoneNumberPlaceholder: "09876...",
            gender: "Giới tính",
            birthdate: "Ngày sinh",
            country: "Quốc gia",
            facebookLink: "Đường dẫn Facebook",
            instagramLink: "Đường dẫn Instagram",
            aboutMe: "Về tôi",
            aboutMePlaceholder: "Hãy viết một ít về bạn...",
            updateButton: "Cập nhật",
            updatingButton: "Đang cập nhật...",
            alertSuccess: "Cập nhật thành công.",
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    // Authentication and API stuff
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiUrl}/user/update/details/${user.id}`;
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
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                reload();
                alert(strings.alertSuccess);
                setIsLoading(false);
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.")
                setIsLoading(false);
            } else {
                alert("Error: " + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert("Unexpected error: " + error);
            setIsLoading(false);
        }
    }

    return (
        <section>
            <header className="section-header">
                <h1>{strings.updateProfileHeader}</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={updateProfile}>
                    <div style={{minHeight: "400px"}}>
                        <InputGroup>
                            <label>{strings.firstName}
                                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                       placeholder={strings.firstNamePlaceHolder}/>
                            </label>
                            <label>{strings.lastName}
                                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                       placeholder={strings.lastNamePlaceholder}/>
                            </label>
                        </InputGroup>
                        <label>{strings.email}
                            <input type="text" value={user.email} placeholder="" disabled/>
                        </label>
                        <label>{strings.phoneNumber}
                            <input type="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                                   placeholder={strings.phoneNumberPlaceholder}/>
                        </label>
                        <InputGroup>
                            <label>{strings.gender}
                                <select value={gender} onChange={e => setGender(e.target.value)}>
                                    {genders.map((gender) => (
                                        <option>{gender}</option>
                                    ))}
                                </select>
                            </label>
                            <label>{strings.birthdate}
                                <input aria-label="Date of birth" type="date"
                                       value={birthdate} max={today}
                                       onChange={e => setBirthdate(e.target.value)}/>
                            </label>
                        </InputGroup>
                        <label>{strings.country}
                            <CountrySelect value={country} onChange={e => setCountry(e.target.value)}/>
                        </label>
                        <label>{strings.facebookLink}
                            <input type="text" value={facebookLink} onChange={e => setFacebookLink(e.target.value)}
                                   placeholder="https://www.facebook.com/..."/>
                        </label>
                        <label>{strings.instagramLink}
                            <input type="text" value={instagramLink} onChange={e => setInstagramLink(e.target.value)}
                                   placeholder="https://www.instagram.com/..."/>
                        </label>
                        <label>{strings.aboutMe}
                            <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)}
                                      placeholder={strings.aboutMePlaceholder}/>
                        </label>
                    </div>
                    <div className="sticky-bottom">
                        {!isLoading ?
                            <button type="submit" className="button-dark">{strings.updateButton}</button>
                            : <button disabled>{strings.updatingButton}</button>}
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default UpdateProfile;