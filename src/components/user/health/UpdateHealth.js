import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import {FaAngleRight} from "react-icons/fa";
import LocalizedStrings from "react-localization";

const UpdateHealth = ({user, token, reload}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            routineLowIntensity: "Low intensity - office work or similar, no workout.",
            routineAverageIntensity: "Average intensity - manual labor and/or semi-regular workouts",
            routineHighIntensity: "High intensity -  hobbyist athlete and/or daily workouts",
            routineExtremeIntensity: "Extreme intensity - professional athlete",
            bmiSevereThinness: "Underweight (Severe thinness)",
            bmiModerateThinness: "Underweight (Moderate thinness)",
            bmiMildThinness: "Underweight (Mild thinness)",
            bmiNormal: "Normal range",
            bmiPreObese: "Overweight (Pre-obese)",
            bmiObese1: "Obese (Class I)",
            bmiObese2: "Obese (Class II)",
            bmiObese3: "Obese (Class III)",
            bmiSevereThinnessVerdict: "This might indicate severe malnutrition and/or an eating disorder. You should eat more calories and check in with a doctor.",
            bmiModerateThinnessVerdict: "This might indicate some degree of malnutrition. It is recommended to eat and exercise more.",
            bmiMildThinnessVerdict: "You are slightly thin. A tad more calories a day and a touch more exercising should put you in shape.",
            bmiNormalVerdict: "You are in shape! Keep it up!",
            bmiPreObeseVerdict: "You are slightly overweight. You should cut down on the fat intake.",
            bmiObese1Verdict: "You are overweight. It is recommended to eat healthier and exercise more.",
            bmiObese2Verdict: "You are severely obese. You should eat healthier and check in with a doctor.",
            bmiObese3Verdict: "You are morbidly obese. Please check in with a doctor.",
            healthProfile: "Your health profile & routine",
            healthProfileMessage: "Share your body stats and workout routine to receive better personalized recipe suggestions.",
            editButton: "Edit",
            bmiMessage: "Your BMI is",
            birthdate: "Date of birth",
            gender: "Gender",
            height: "Height",
            weight: "Weight",
            workoutRoutine: "Workout routine",
            generateMenuButton: "Let us suggest your menu",
            notEnoughHealth: "Share with us some details about you, so that we may recommend recipes that suit you best",
            noHealth: "Get started",
            yearsOld: "years old",
            genderMale: "Male",
            genderFemale: "Female",
            verdictNone: "We will automatically calculate your BMI with your height and weight.",
            saveButton: "Save",
            alertSuccess: "Health profile updated.",
        },
        vi: {
            routineLowIntensity: "Ít vận động - làm việc văn phòng, không thể thao.",
            routineAverageIntensity: "Vận động vừa phải - lao động chân tay hoặc thỉnh thoảng tập luyện.",
            routineHighIntensity: "Vận động thường xuyên - người có sở thích thể thao hoặc luyện tập hằng ngày.",
            routineExtremeIntensity: "Vận động cường độ nặng - vận động viên chuyên nghiệp.",
            bmiSevereThinness: "Thiếu cân nghiêm trọng.",
            bmiModerateThinness: "Thiếu cân vừa phải.",
            bmiMildThinness: "Thiếu cân nhẹ.",
            bmiNormal: "Cân nặng bình thường.",
            bmiPreObese: "Tiền thừa cân.",
            bmiObese1: "Béo phì độ 1.",
            bmiObese2: "Béo phì độ 2.",
            bmiObese3: "Béo phì độ 3.",
            bmiSevereThinnessVerdict: "Bạn đang bị suy dinh dưỡng hoặc rối loạn ăn uống. Bạn cần ăn nhiều calo hơn và tìm bác sĩ kiểm tra sức khỏe của bạn.",
            bmiModerateThinnessVerdict: "Bạn đang bị suy dinh dưỡng. Bạn cần ăn nhiều hơn và tập thể dục thường xuyên.",
            bmiMildThinnessVerdict: "Bạn đang thiếu cân. Hãy nạp nhiều calo hơn và tập thể dục để có được một cơ thể khỏe mạnh.",
            bmiNormalVerdict: "Bạn đang có một cơ thể khỏe mạnh! Hãy giữ vững nó nhé!",
            bmiPreObeseVerdict: "Bạn đang thừa cân. Bạn nên giảm lượng chất béo.",
            bmiObese1Verdict: "Bạn đang béo phì độ 1. Hãy ăn uống lành mạnh hơn và thường xuyên tập thể dục.",
            bmiObese2Verdict: "Bạn đang béo phì độ 2. Hãy ăn uống lành mạnh hơn nữa và tìm bác sĩ để kiểm tra sức khỏe của bạn.",
            bmiObese3Verdict: "Bạn đang béo phì độ 3. Hãy tìm bác sĩ để kiểm tra sức khỏe của bạn ngay.",
            healthProfile: "Hồ sơ sức khỏe và lịch trình sinh hoạt",
            healthProfileMessage: "Hãy chia sẻ về chỉ số cơ thể và lịch trình sinh hoạt của bạn để chúng tôi đề xuất các công thức phù hợp",
            editButton: "Chỉnh sửa",
            bmiMessage: "Chỉ số BMI của bạn là",
            birthdate: "Ngày sinh",
            gender: "Giới tính",
            height: "Chiều cao",
            weight: "Cân nặng",
            workoutRoutine: "Cường độ tập luyện",
            generateMenuButton: "Đề xuất thực đơn cho bạn",
            notEnoughHealth: "Hãy chia sẻ với chúng tôi một số thông tin để có thể đề xuất các công thức phù hợp hơn với bạn",
            noHealth: "Bắt đầu ngay",
            yearsOld: "tuổi",
            genderMale: "Nam",
            genderFemale: "Nữ",
            verdictNone: "Chúng tôi sẽ tính toán chỉ số BMI của bạn dựa trên cân nặng và chiều cao",
            saveButton: "Lưu",
            alertSuccess: "Đã cập nhật hồ sơ sức khỏe.",
        }
    });

    // Health index
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);
    const [routine, setRoutine] = useState(user.workout_routine);
    const [bmi, setBmi] = useState();
    const [bodyType, setBodyType] = useState();
    const [verdict, setVerdict] = useState()
    const routines = [
        strings.routineLowIntensity,
        strings.routineAverageIntensity,
        strings.routineHighIntensity,
        strings.routineExtremeIntensity
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
                alert(strings.alertSuccess);
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
            setVerdict(strings.verdictNone);
        } else {
            if (result < 16) {
                setBodyType(strings.bmiSevereThinness);
                setVerdict(strings.bmiSevereThinnessVerdict)
            } else if (result < 17 && result >= 16) {
                setBodyType(strings.bmiModerateThinness);
                setVerdict(strings.bmiModerateThinnessVerdict)
            } else if (result < 18.5 && result >= 17) {
                setBodyType(strings.bmiMildThinness);
                setVerdict(strings.bmiMildThinnessVerdict)
            } else if (result < 25 && result >= 18.5) {
                setBodyType(strings.bmiNormal);
                setVerdict(strings.bmiNormalVerdict)
            } else if (result < 30 && result >= 25) {
                setBodyType(strings.bmiPreObese);
                setVerdict(strings.bmiPreObeseVerdict)
            } else if (result < 35 && result >= 30) {
                setBodyType(strings.bmiObese1);
                setVerdict(strings.bmiObese1Verdict)
            } else if (result < 40 && result >= 35) {
                setBodyType(strings.bmiObese2);
                setVerdict(strings.bmiObese2Verdict)
            } else if (result >= 40) {
                setBodyType(strings.bmiObese3);
                setVerdict(strings.bmiObese3Verdict)
            }
        }
    }
    useEffect(calculateBmi, [height, weight])

    return (
        <section>
            <header className="section-header">
                <h1>{strings.healthProfile}</h1>
                <p>{strings.healthProfileMessage}</p>
            </header>
            <div className="section-content">
                <div className="bmi-result">
                    {bmi && <>
                        {bodyType && <h1> {strings.bmiMessage} {bmi} - {bodyType}</h1>}
                        {verdict && <p>{verdict}</p>}
                    </>}
                </div>
                <Form onSubmit={handleSubmit}>
                    <div style={{minHeight: "400px"}}>
                        {/*User health details*/}
                        <InputGroup>
                            <label>{strings.height} (cm)
                                <input aria-label="Your height" type="number"
                                       value={height} min={0}
                                       onChange={e => setHeight(e.target.value)}/>
                            </label>
                            <label>{strings.weight} (kg)
                                <input aria-label="Your weight" type="number"
                                       value={weight} min={0}
                                       onChange={e => setWeight(e.target.value)}/>
                            </label>
                        </InputGroup>
                        {/*User profile details*/}
                        <InputGroup>
                            <label>{strings.gender}
                                <select value={gender} onChange={e => setGender(e.target.value)}>
                                    {gender === null && <option selected disabled>Your gender...</option>}
                                    {genders.map((gender) => (
                                        <option>{gender}</option>))}
                                </select>
                            </label>
                            <label>{strings.birthdate}
                                <input aria-label="Date of birth" type="date"
                                       value={birthdate} max={today}
                                       onChange={e => setBirthdate(e.target.value)}/>
                            </label>
                        </InputGroup>
                        {/*Workout routine*/}
                        <label>{strings.workoutRoutine}
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
                        {strings.generateMenuButton} <FaAngleRight/></Link>}
                    <div className="sticky-bottom">
                        <button type="submit" className="button-dark">{strings.saveButton}</button>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateHealth;