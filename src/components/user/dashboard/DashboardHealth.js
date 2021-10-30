import React, {useState, useContext, useEffect} from "react";
import {UserContext} from "../../../context/UserContext";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const DashboardHealth = () => {
    const user = useContext(UserContext);

    const today = new Date;
    const birthdate = new Date(user.birth_date);
    let ageYear = today.getFullYear() - birthdate.getFullYear();
    let ageMonth = today.getMonth() - birthdate.getMonth();
    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthdate.getDate())) {
        ageYear--;
    }
    const [bmi, setBmi] = useState();
    const [bodyType, setBodyType] = useState();
    const [verdict, setVerdict] = useState()
    const routines = [
        "Low intensity - office work or similar, no workout.",
        "Average intensity - manual labor and/or semi-regular workouts",
        "High intensity -  hobbyist athlete and/or daily workouts",
        "Extreme intensity - professional athlete"
    ]

    let routine = null;
    if (user.workout_routine !== null) {
        if (user.workout_routine === 1) {
            routine = routines[0];
        } else if (user.workout_routine === 2) {
            routine = routines[1];
        } else if (user.workout_routine === 3) {
            routine = routines[2];
        } else if (user.workout_routine === 4) {
            routine = routines[3];
        }
    }

    const calculateBmi = () => {
        let result = (user.weight / Math.pow((user.height / 100), 2)).toFixed(2);
        setBmi(result);
        // Set BMI category
        if (user.weight === 0 || user.height === 0) {
            setBodyType();
            setVerdict();
        } else if (result < 16) {
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

    useEffect(calculateBmi, [user.height, user.weight]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your health profile</h1>
                <Link to="/health/details"><FaAngleRight/>Edit</Link>
            </header>
            <div className="section-content">
                {bmi &&
                <div>
                    {bodyType && <h1>Your BMI is {bmi}  <>- {bodyType}</>
                    </h1>}
                    {verdict && <p>{verdict}</p>}
                </div>}
                <ul style={{paddingTop: "20px"}}>
                    {user.birth_date &&
                    <li>Date of birth: {user.birth_date} ({ageYear} years old)</li>}
                    {user.gender &&
                    <li>Gender: {user.gender} </li>}
                    {user.height &&
                    <li><span>Height:</span> {user.height} cm </li>}
                    {user.weight &&
                    <li>Weight: {user.weight} kg </li>}
                    {user.workout_routine &&
                    <li>Workout routine: {routine} </li>}
                </ul>
                <Link to="/menu">Let us suggest your menu <FaAngleRight/></Link>
            </div>
        </section>
    )
}

export default DashboardHealth;