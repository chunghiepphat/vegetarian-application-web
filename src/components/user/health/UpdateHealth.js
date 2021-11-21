import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import {FaAngleRight} from "react-icons/fa";

const UpdateHealth = ({user, token, reload}) => {
    // Health index
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);
    const [routine, setRoutine] = useState(user.workout_routine);
    const [bmi, setBmi] = useState();
    const [bodyType, setBodyType] = useState();
    const [verdict, setVerdict] = useState()
    const routines = [
        "Low intensity - office work or similar, no workout.",
        "Average intensity - manual labor and/or semi-regular workouts",
        "High intensity -  hobbyist athlete and/or daily workouts",
        "Extreme intensity - professional athlete"
    ]
    // User profile
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
    console.log(height + " " + weight)
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
                alert("Health profile updated.");
                // window.location.reload();
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.")
            } else {
                alert("Error: " + response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }
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
            console.error(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    }
    const calculateBmi = () => {
        let result = (weight / Math.pow((height / 100), 2)).toFixed(2);
        setBmi(result);
        // Set BMI category
        if (height === "0" || weight === "0") {
            setBodyType(null);
            setVerdict("We will automatically calculate your BMI with your height and weight.");
        } else {
            if (result < 16) {
                setBodyType("Underweight (Severe thinness)");
                setVerdict("This might indicate severe malnutrition and/or an eating disorder. You should eat more calories and check in with a doctor.")
            } else if (result < 17 && result >= 16) {
                setBodyType("Underweight (Moderate thinness)");
                setVerdict("This might indicate some degree of malnutrition. It is recommended to eat and exercise more.")
            } else if (result < 18.5 && result >= 17) {
                setBodyType("Underweight (Mild thinness)");
                setVerdict("You are slightly thin. A tad more calories a day and a touch more exercising should put you in shape.")
            } else if (result < 25 && result >= 18.5) {
                setBodyType("Normal range");
                setVerdict("You are in shape! Keep it up!")
            } else if (result < 30 && result >= 25) {
                setBodyType("Overweight (Pre-obese)");
                setVerdict("You are slightly overweight. You should cut down on the fat intake.")
            } else if (result < 35 && result >= 30) {
                setBodyType("Obese (Class I)");
                setVerdict("You are overweight. It is recommended to eat healthier and exercise more.")
            } else if (result < 40 && result >= 35) {
                setBodyType("Obese (Class II)");
                setVerdict("You are severely obese. You should eat healthier and check in with a doctor.")
            } else if (result >= 40) {
                setBodyType("Obese (Class II)");
                setVerdict("You are morbidly obese. Please check in with a doctor.")
            }
        }
    }
    useEffect(calculateBmi, [height, weight])

    return (
        <section>
            <header className="section-header">
                <h1>Your health details & routine</h1>
                <p>Share your body stats and workout routine to receive better personalized recipe suggestions.</p>
            </header>
            <div className="section-content">
                <div className="bmi-result">
                    {bmi && <>
                        {bodyType && <h1> Your BMI is {bmi} - {bodyType}</h1>}
                        {verdict && <p>{verdict}</p>}
                    </>}
                </div>
                <Form onSubmit={handleSubmit}>
                    <div style={{minHeight: "400px"}}>
                        {/*User health details*/}
                        <InputGroup>
                            <label>Height (cm)
                                <input aria-label="Your height" type="number"
                                       value={height} min={0}
                                       onChange={e => setHeight(e.target.value)}/>
                            </label>
                            <label>Weight (kg)
                                <input aria-label="Your weight" type="number"
                                       value={weight} min={0}
                                       onChange={e => setWeight(e.target.value)}/>
                            </label>
                        </InputGroup>
                        {/*User profile details*/}
                        <InputGroup>
                            <label>Gender
                                <select value={gender} onChange={e => setGender(e.target.value)}>
                                    {gender === null && <option selected disabled>Your gender...</option>}
                                    {genders.map((gender) => (
                                        <option>{gender}</option>))}
                                </select>
                            </label>
                            <label>Date of birth
                                <input aria-label="Date of birth" type="date"
                                       value={birthdate} max={today}
                                       onChange={e => setBirthdate(e.target.value)}/>
                            </label>
                        </InputGroup>
                        {/*Workout routine*/}
                        <label>Workout routine
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
                        Let us suggest your weekly menu <FaAngleRight/></Link>}
                    <div className="sticky-bottom">
                        <button type="submit" className="button-dark">Save</button>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateHealth;