import React, {useContext} from "react";
import {UserContext} from "../../../context/UserContext";
import {Link} from "react-router-dom";
import {FaAngleRight, FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhoneAlt} from "react-icons/fa";

const DashboardHealth = () => {
    const user = useContext(UserContext);

    const routines = [
        "Low intensity - office work or similar, no workout.",
        "Average intensity - manual labor and/or semi-regular workouts",
        "High intensity -  hobbyist athlete and/or daily workouts",
        "Extreme intensity - professional athlete"
    ]
    let routine = null;
    if (user.workout_routine !== null) {
        if (user.workout_routine === 1) {
            routine = routines[1];
        } else if (user.workout_routine === 2) {
            routine = routines[2];
        } else if (user.workout_routine === 3) {
            routine = routines[3];
        } else if (user.workout_routine === 4) {
            routine = routines[4];
        }
    }
    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your health profile</h1>
                <Link to="/health/details"><FaAngleRight/>Edit</Link>
            </header>
            <div className="section-content">
                <ul>
                    {user.height &&
                    <li><span>Height:</span> {user.height} cm </li>}
                    {user.weight &&
                    <li>Weight: {user.weight} kg </li>}
                    {user.workout_routine &&
                    <li>Workout routine: {routine} </li>}
                </ul>
                <ul>
                    {user.gender &&
                    <li>Gender: {user.gender} </li>}
                    {user.birth_date &&
                    <li>Birthdate: {user.birth_date} </li>}
                    <li><Link to="/update"><FaAngleRight/>Edit</Link></li>
                </ul>
            </div>
        </section>
    )
}

export default DashboardHealth;