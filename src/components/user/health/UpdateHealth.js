import React, {useContext, useEffect, useState} from "react";
import {genericStrings, profileStrings, requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {dashboardDisplayStrings, healthDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link} from "react-router-dom";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import {FaAngleRight} from "react-icons/fa";

const UpdateHealth = ({token, reload}) => {
    // Localizations
    let locale = useContext(LocaleContext);
    healthDisplayStrings.setLanguage(locale);
    profileStrings.setLanguage(locale);
    genericStrings.setLanguage(locale);

    // Gets user info
    const user = useContext(UserContext);

    // Initializes user body index
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);
    const [routine, setRoutine] = useState(user.workout_routine);
    const routines = [
        profileStrings.routineLowIntensity,
        profileStrings.routineAverageIntensity,
        profileStrings.routineHighIntensity,
        profileStrings.routineExtremeIntensity
    ]

    // Initializes user personal profile
    let genders = [
        {name: genericStrings.male, value: "Male"},
        {name: genericStrings.female, value: "Female"}
    ];
    const [gender, setGender] = useState(user.gender);
    const [birthdate, setBirthdate] = useState(user.birth_date);

    // Calculates age
    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    if (currentMonth < 10) currentMonth = "0" + currentMonth;
    let currentYear = new Date().getFullYear();
    const today = currentYear + "-" + currentMonth + "-" + currentDate;

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Updates user health profile
    const updateHealth = async () => {
        // Generates request body
        let body = JSON.stringify({
            "height": height,
            "weight": weight,
            "workout_routine": routine,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/update/bodyindex/${user.id}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                reload();
                alert(healthDisplayStrings.healthProfileSaveSuccess);
                // window.location.reload();
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized);
                // setIsLoading(false);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
                // setIsLoading(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            // setIsLoading(false);
        }
    }

    // Updates birthdate & gender
    const updateProfile = async () => {
        // Generates request body
        let body = JSON.stringify({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "about_me": user.about_me,
            "country": user.country,
            "phone_number": user.phone_number,
            "facebook_link": user.facebook_link,
            "instagram_link": user.instagram_link,
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
                await updateHealth();
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.")
            } else {
                alert("Error: " + response.status);
            }
        } catch (error) {
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    }

    // Calculates BMI with fetched data
    const [bmi, setBmi] = useState();
    const [bodyType, setBodyType] = useState();
    const [verdict, setVerdict] = useState()
    const calculateBmi = () => {
        let result = (weight / Math.pow((height / 100), 2)).toFixed(2);
        setBmi(result);
        // Set BMI category
        if (user.weight === 0 || user.height === 0) {
            setBodyType(null);
            setVerdict(null);
        } else if (result < 16) {
            setBodyType(profileStrings.bmiSevereThinness);
            setVerdict(profileStrings.bmiSevereThinnessVerdict)
        } else if (result < 17 && result >= 16) {
            setBodyType(profileStrings.bmiModerateThinness);
            setVerdict(profileStrings.bmiModerateThinnessVerdict)
        } else if (result < 18.5 && result >= 17) {
            setBodyType(profileStrings.bmiMildThinness);
            setVerdict(profileStrings.bmiMildThinnessVerdict)
        } else if (result < 25 && result >= 18.5) {
            setBodyType(profileStrings.bmiNormal);
            setVerdict(profileStrings.bmiNormalVerdict)
        } else if (result < 30 && result >= 25) {
            setBodyType(profileStrings.bmiPreObese);
            setVerdict(profileStrings.bmiPreObeseVerdict)
        } else if (result < 35 && result >= 30) {
            setBodyType(profileStrings.bmiObese1);
            setVerdict(profileStrings.bmiObese1Verdict)
        } else if (result < 40 && result >= 35) {
            setBodyType(profileStrings.bmiObese2);
            setVerdict(profileStrings.bmiObese2Verdict)
        } else if (result >= 40) {
            setBodyType(profileStrings.bmiObese3);
            setVerdict(profileStrings.bmiObese3Verdict)
        }
    }
    useEffect(calculateBmi, [height, weight, locale])

    return (
        <section>
            <header className="section-header">
                <h1>{healthDisplayStrings.healthProfile}</h1>
                <p>{healthDisplayStrings.healthProfileSubheader}</p>
            </header>
            <div className="section-content">
                <div className="bmi-result">
                    {bmi && <>
                        {bodyType && <h1> {profileStrings.healthProfileBmiMessage} {bmi} - {bodyType}</h1>}
                        {verdict && <p>{verdict}</p>}
                    </>}
                </div>
                <Form onSubmit={handleSubmit}>
                    <div style={{minHeight: "400px"}}>
                        {/*User health details*/}
                        <InputGroup>
                            <label>{profileStrings.height} (cm)
                                <input aria-label="Your height" type="number"
                                       value={height} min={0}
                                       onChange={e => setHeight(e.target.value)}/>
                            </label>
                            <label>{profileStrings.weight} (kg)
                                <input aria-label="Your weight" type="number"
                                       value={weight} min={0}
                                       onChange={e => setWeight(e.target.value)}/>
                            </label>
                        </InputGroup>
                        {/*User profile details*/}
                        <InputGroup>
                            <label>{profileStrings.gender}
                                <select value={gender} onChange={e => setGender(e.target.value)}>
                                    {gender === null && <option selected disabled>...</option>}
                                    {genders.map((gender) => (
                                        <option value={gender.value}>{gender.name}</option>))}
                                </select>
                            </label>
                            <label>{profileStrings.birthdate}
                                <input aria-label="Date of birth" type="date"
                                       value={birthdate} max={today}
                                       onChange={e => setBirthdate(e.target.value)}/>
                            </label>
                        </InputGroup>
                        {/*Workout routine*/}
                        <label>{profileStrings.workoutRoutine}
                            <select value={routine} onChange={e => setRoutine(e.target.value)}>
                                {routines.map((option, index) => (
                                    <option value={index + 1}>{option}</option>))}
                            </select>
                        </label>
                    </div>
                    {user.birth_date && user.gender
                    && user.height > 0 && user.weight > 0
                    && user.workout_routine > 0 &&
                    <Link to="/menu" className="button-link button-light" style={{alignSelf: "center", width: "400px"}}>
                        {healthDisplayStrings.healthProfileSuggestMenu} <FaAngleRight/></Link>}
                    <div className="sticky-bottom">
                        <button type="submit" className="button-dark">{healthDisplayStrings.healthProfileSave}</button>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateHealth;