import React, {useContext, useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";

const DashboardRecommendations = () => {
    const user = useContext(UserContext);
    const today = new Date;
    const birthdate = new Date(user.birth_date);
    let ageYear = today.getFullYear() - birthdate.getFullYear();
    let ageMonth = today.getMonth() - birthdate.getMonth();
    if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthdate.getDate())) {
        ageYear--;
    }
    const [protein, setProtein] = useState();
    const [fat, setFat] = useState();
    const [carb, setCarb] = useState();
    const [calories, setCalories] = useState();
    const fetchData = async () => {
        const api = `${apiUrl}/user/calculate/nutrition?height=${user.height}&weight=${user.weight}&age=${ageYear}&gender=${user.gender}&type_workout=${user.workout_routine}`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setProtein(result.protein);
                await setFat(result.fat);
                await setCarb(result.carb);
                await setCalories(result.calories);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(fetchData, [user]);

    return (
        <section>
            <header className="section-header">
                <h1>Recommended daily nutrition consumption</h1>
                <p>Based on your BMI, profile and routine.</p>
            </header>
            <div className="section-content">
                <ul style={{paddingTop: "20px"}}>
                    {protein >= 0 &&
                    <li><span style={{fontWeight: "bold"}}>Protein: </span>{Math.round(protein)} g</li>}
                    {fat >= 0 &&
                    <li><span style={{fontWeight: "bold"}}>Fat: </span>{Math.round(fat)} g</li>}
                    {carb >= 0 &&
                    <li><span style={{fontWeight: "bold"}}>Carb: </span>{Math.round(carb)} g</li>}
                    {calories >= 0 &&
                    <li><span style={{fontWeight: "bold"}}>Calories: </span>{Math.round(calories)} cal</li>}
                </ul>
            </div>
        </section>
    )
}

export default DashboardRecommendations;