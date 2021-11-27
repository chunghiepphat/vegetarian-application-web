import React, {useState, useEffect, useContext} from "react";
import {dashboardDisplayStrings} from "../../../resources/UserDisplayStrings";
import {profileStrings} from "../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import moment from "moment";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";


const DashboardHealth = ({user}) => {
    // Localizations
    let locale = useContext(LocaleContext);
    dashboardDisplayStrings.setLanguage(locale);
    profileStrings.setLanguage(locale);

    // Calculates age from birthdate and current date
    const today = new Date;
    const birthdate = new Date(user.birth_date);
    let ageYear = today.getFullYear() - birthdate.getFullYear();
    let ageMonth = today.getMonth() - birthdate.getMonth();
    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthdate.getDate())) {
        ageYear--;
    }

    // Displays workout routine
    const routines = [
        profileStrings.routineLowIntensity,
        profileStrings.routineAverageIntensity,
        profileStrings.routineHighIntensity,
        profileStrings.routineExtremeIntensity
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

    // Calculates BMI and form verdict
    const [bmi, setBmi] = useState();
    const [bodyType, setBodyType] = useState();
    const [verdict, setVerdict] = useState()
    const calculateBmi = () => {
        let result = (user.weight / Math.pow((user.height / 100), 2)).toFixed(2);
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
    useEffect(calculateBmi, [user.height, user.weight, locale]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>{dashboardDisplayStrings.dashboardHealth}</h1>
                <Link to="/health/details"><FaAngleRight/>{dashboardDisplayStrings.dashboardEdit}</Link>
            </header>
            <div className="section-content">
                {bmi && <div>
                    {bodyType && <h1>{dashboardDisplayStrings.dashboardHealthBmi} {bmi} - {bodyType}</h1>}
                    {verdict && <p>{verdict}</p>}
                </div>}
                <ul style={{paddingTop: "20px"}}>
                    {user.birth_date &&
                    <li><span
                        style={{fontWeight: "bold"}}>{profileStrings.birthdate}: </span>{moment(user.birth_date).format("ll")} ({ageYear} {profileStrings.yearsOld})
                    </li>}
                    {user.gender &&
                    <li><span style={{fontWeight: "bold"}}>{profileStrings.gender}:</span> {user.gender} </li>}
                    {user.height > 0 &&
                    <li><span style={{fontWeight: "bold"}}>{profileStrings.height}:</span> {user.height} cm </li>}
                    {user.weight > 0 &&
                    <li><span style={{fontWeight: "bold"}}>{profileStrings.weight}:</span> {user.weight} kg </li>}
                    {user.workout_routine > 0 &&
                    <li><span style={{fontWeight: "bold"}}>{profileStrings.workoutRoutine}:</span> {routine} </li>}
                </ul>
                {user.birth_date && user.gender
                && user.height > 0 && user.weight > 0
                && user.workout_routine > 0 ?
                    <Link to="/menu">{dashboardDisplayStrings.dashboardHealthSuggestMenu} <FaAngleRight/></Link>
                    : <><em>{dashboardDisplayStrings.dashboardHealthCompleteProfile}</em>
                        <Link to="/health">{dashboardDisplayStrings.dashboardHealthGetStarted}<FaAngleRight/></Link></>}

            </div>
        </section>
    )
}

export default DashboardHealth;